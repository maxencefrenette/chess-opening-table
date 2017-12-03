/// <reference path="types/node-uci.d.ts" />

import { Result, playGame } from './chess';
import { Database, Position } from './database';

playGame('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 100000).then(console.log);

let db = new Database('us-west-2');
db.putPosition(new Position('test', 1, 0, 0)).then(console.log);
db.getPosition('test').then(console.log);
