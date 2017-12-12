/// <reference path="types/node-uci.d.ts" />
/// <reference path="types/chess.js.d.ts" />

import { Worker } from './worker';

const worker = new Worker();
worker.start();
