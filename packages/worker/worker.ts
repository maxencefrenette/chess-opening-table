import { Database, Position } from '@chess-opening-table/database';
import { Chess } from 'chess.js';
import { maxBy, property, sum } from 'lodash';
import { Engine, playGame, Result, spawnEngine } from './chess';
import { Color, turn } from './util';

const START_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

interface Results {
    whiteWin: number;
    blackWin: number;
}

function computeChildPositions(fen: string): string[] {
    const board = new Chess(fen);
    const childrenFen = [];
    const moves = board.moves();

    for (const move of moves) {
        board.move(move);
        childrenFen.push(board.fen());
        board.undo();
    }

    return childrenFen;
}

function pickChildPosition(positions: Position[]): Position {
    // TODO: Make it slightly random to allow multiple workers to work on different parts of the tree at once.
    return maxBy(positions, property('score'))!;
}

export class Worker {
    db: Database;
    engines: [Engine, Engine];

    constructor() {
        this.db = new Database('us-west-2');
    }

    async start(): Promise<never> {
        console.log('Starting worker');

        this.engines = [
            await spawnEngine(),
            await spawnEngine(),
        ];

        const rootPosition = await this.db.getPosition(START_POSITION);

        if (rootPosition === undefined) {
            console.log(
                'The root position wasn\'t found in the database. ' +
                'Initializing database with the root position.',
            );
            const results = await this.evaluatePosition(START_POSITION);
            const newRootPosition = new Position(START_POSITION, results.whiteWin, results.blackWin, 0);
            await this.db.putPosition(newRootPosition);
            console.log('Done initializing the root position.');
        }

        while (true) {
            const positions = await this.findExpandablePosition();
            const positionToExpand = positions[positions.length - 1];
            await this.expandPosition(positionToExpand);
            for (const position of positions.reverse()) {
                this.updatePosition(position);
            }
        }
    }

    async findExpandablePosition(): Promise<string[]> {
        let lastPosition = await this.db.getPosition(START_POSITION);

        if (lastPosition === undefined) {
            throw new Error('Couldn\'t find start position');
        }

        const positions = [lastPosition.fen];

        while (true) {
            if (lastPosition.children === 0) return positions;

            const childPositionsAsync = computeChildPositions(lastPosition.fen)
                .map(async (fen) => {
                    const pos = await this.db.getPosition(fen);
                    if (pos === undefined) throw new Error(`Couldn't find position "${fen}"`);
                    return pos;
                });
            const childPositions = await Promise.all(childPositionsAsync);

            lastPosition = pickChildPosition(childPositions);
            positions.push(lastPosition.fen);
        }
    }

    async expandPosition(fen: string): Promise<void> {
        const childFens = computeChildPositions(fen);

        for (const childFen of childFens) {
            const results = await this.evaluatePosition(childFen);
            const position = new Position(childFen, results.whiteWin, results.blackWin, 0);
            await this.db.putPosition(position);
        }
    }

    async updatePosition(fen: string): Promise<void> {
        const childPositionsAsync = computeChildPositions(fen)
            .map(async (childFen) => {
                const pos = await this.db.getPosition(childFen);
                if (pos === undefined) throw new Error(`Couldn't find position "${childFen}"`);
                return pos;
            });
        const childPositions = await Promise.all(childPositionsAsync);

        const numberOfChildren = sum(childPositions.map((c) => c.children + 1));
        const bestChild = maxBy(childPositions, (c) => {
            return turn(fen) === Color.White ? c.score : -c.score;
        })!;

        const updatedPosition = new Position(fen, bestChild.whiteWin, bestChild.blackWin, numberOfChildren);
        await this.db.putPosition(updatedPosition);
    }

    async evaluatePosition(fen: string): Promise<Results> {
        console.log(`Evaluation position "${fen}"`);

        const results = {
            whiteWin: 0,
            blackWin: 0,
        };

        for (let i = 0; i < 100; i++) {
            console.log(`[${i}/100]`);
            const result = await playGame(fen, 1000, this.engines);
            switch (result) {
                case Result.WhiteWin:
                    results.whiteWin++;
                    break;
                case Result.BlackWin:
                    results.blackWin++;
                    break;
            }
        }

        return results;
    }
}
