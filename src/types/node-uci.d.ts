/// <reference types="node" />

declare module 'node-uci' {
    import { EventEmitter } from 'events';

    export class Engine {
        constructor(filePath: string);
        getBufferUntil(condition: (s: string) => boolean): Promise<string[]>;
        write(command: string): void;
        chain(): EngineChain<undefined>;
        init(): Promise<Engine>;
        quit(): Promise<Engine>;
        isready(): Promise<Engine>;
        sendCmd(cmd: string): Promise<Engine>;
        setoption(name: string, value?: string): Promise<Engine>;
        ucinewgame(): Promise<Engine>;
        ponderhit(): Promise<Engine>;
        position(fen: string, moves?: string[]): Promise<Engine>;
        go(options: {[key: string]: any}): Promise<{bestmove: string, info: any[], ponder: string}>;
        goInfinite(options: {[key: string]: any}): EventEmitter;
        stop(): Promise<{bestmove: string, info: string[]}>
    }

    export class EngineChain<T> {
        constructor(engine: Engine);
        init(): EngineChain<Engine>;
        setoption(name: string, value?: string): EngineChain<Engine>;
        isready(): EngineChain<Engine>;
        ucinewgame(): EngineChain<Engine>;
        quit(): EngineChain<Engine>;
        position(fen: string, moves?: string[]): EngineChain<Engine>;
        go(options: {[key: string]: any}): EngineChain<{bestmove: string, info: any[], ponder: string}>;
        exec(): Promise<T>;
    }
}
