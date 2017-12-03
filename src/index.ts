/// <reference path="types/node-uci.d.ts" />

import { Result, playGame } from './chess';

playGame('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 100000).then(console.log);
