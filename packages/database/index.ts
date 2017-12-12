import { config, DynamoDB } from 'aws-sdk';
import { AttributeMap, GetItemInput, PutItemInput, PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';
import { Position } from './position';

const TABLE_NAME = 'chess-opening-table';

export class Database {
    db: DynamoDB;

    constructor(region: string) {
        config.update({ region });
        this.db = new DynamoDB();
    }

    getPosition(fen: string): Promise<Position | undefined> {
        const params: GetItemInput = {
            TableName: TABLE_NAME,
            Key: {
                fen: { S: fen },
            },
        };

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
            });
        });
    }

    putPosition(position: Position): Promise<void> {
        const params: PutItemInput = {
            TableName: TABLE_NAME,
            Item: position.toItemAttributeMap(),
        };

        return new Promise((resolve, reject) => {
            this.db.putItem(params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}
