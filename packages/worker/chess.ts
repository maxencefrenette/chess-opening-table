import { Engine } from 'node-uci';
import { Color, rand, turn } from './util';

export { Engine } from 'node-uci';

export enum Result {
    WhiteWin,
    Draw,
    BlackWin,
}

function win(color: Color) {
    switch (color) {
        case Color.White: return Result.WhiteWin;
        case Color.Black: return Result.BlackWin;
    }
}

function lost(color: Color) {
    switch (color) {
        case Color.White: return Result.BlackWin;
        case Color.Black: return Result.WhiteWin;
    }
}

export async function spawnEngine() {
    let engine = new Engine('stockfish');
    await engine.init();
    await engine.isready();
    return engine;
}

export async function playGame(startPosition: string, nodesPerMove: number, [w, b]: [Engine, Engine]) {
    let moveHistory = [];
    let drawCounter = 0;

    while(true) {
        let currentPlayer = turn(startPosition);
        let currentEngine = currentPlayer == Color.White ? w : b;

        await currentEngine.position(startPosition, moveHistory);
        let result = await currentEngine.go({nodes: nodesPerMove * rand(0.9, 1.1)});
        moveHistory.push(result.bestmove);
        
        // Check for mate
        let score = result.info[result.info.length - 1].score;
        if (score.unit === "mate") {
            if (score.value > 0) {
                return win(currentPlayer);
            } else {
                return lost(currentPlayer);
            }
        }

        // Check for draws
        if (moveHistory.length > 34 && Math.abs(score) < 20) {
            drawCounter++;
            if (drawCounter >= 8) {
                return Result.Draw;
            }
        } else {
            drawCounter = 0;
        }

        // Check for games that never end
        if (moveHistory.length > 500) {
            return Result.Draw;
        }
    }
}
