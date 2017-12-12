import { AttributeMap, PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';

export class Position {
    static fromAttributeMap(map: AttributeMap) {
        // TODO: null error handling
        return new Position(
            map.fen.S!,
            parseInt(map.whiteWin.N!, 10),
            parseInt(map.blackWin.N!, 10),
            parseInt(map.children.N!, 10),
        );
    }

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
        };
    }

    get score(): number {
        return (1 + this.whiteWin - this.blackWin) / 2;
    }
}
