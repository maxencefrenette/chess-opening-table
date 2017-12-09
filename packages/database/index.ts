import { DynamoDB, config } from 'aws-sdk';
import { PutItemInput, PutItemInputAttributeMap, GetItemInput, AttributeMap } from 'aws-sdk/clients/dynamodb';

const TABLE_NAME = 'chess-opening-table';

export class Position {
    constructor(
        public fen: string,
        public whiteWin: number,
        public blackWin: number,
        public children: number,
    ) {}

    toItemAttributeMap(): PutItemInputAttributeMap {
        return {
            fen: { S: this.fen },
            whiteWin: { N: this.whiteWin.toString() },
            blackWin: { N: this.blackWin.toString() },
            children: { N: this.children.toString() },
        }
    }

    static fromAttributeMap(map: AttributeMap) {
        // TODO: null error handling
        return new Position(
            map.fen.S!,
            parseInt(map.whiteWin.N!),
            parseInt(map.blackWin.N!),
            parseInt(map.children.N!),
        );
    }

    get score(): number {
        return (1 + this.whiteWin - this.blackWin) / 2;
    }
}

export class Database {
    db: DynamoDB
    
    constructor(region: string) {
        config.update({ region });
        this.db = new DynamoDB();
    }

    getPosition(fen: string): Promise<Position | undefined> {
        let params: GetItemInput = {
            TableName: TABLE_NAME,
            Key: {
                'fen': { S: fen },
            },
        }

        return new Promise((resolve, reject) => {
            this.db.getItem(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (data.Item) {
                        resolve(Position.fromAttributeMap(data.Item));
                    } else {
                        resolve(undefined);
                    }
                }
            })
        })
    }

    putPosition(position: Position): Promise<void> {
        let params: PutItemInput = {
            TableName: TABLE_NAME,
            Item: position.toItemAttributeMap(),
        }

        return new Promise((resolve, reject) => {
            this.db.putItem(params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }
}
