declare module 'chess.js' {
    export class Chess {
        constructor(fen?: string);
        ascii(): string;
        board(): any[][];
        clear(): void;
        fen(): string;
        game_over(): boolean;
        get(square: string): any;
        history(options: any[]): string[];
        in_check(): boolean;
        in_checkmate(): boolean;
        in_draw(): boolean;
        in_stalemate(): boolean;
        in_threefold_repetition(): boolean;
        header(...headers: string[]): void;
        header(): {[key: string]: string};
        insufficient_material(): boolean;
        load(fen: string): boolean;
        load_pgn(pgn: string, options?: {[key: string]: any}): boolean;
        move(move: string, options?: {[key: string]: any}): any | null;
        moves(options?: {[key: string]: any}): string[];
        pgn(options?: {[key: string]: any}): string;
        put(piece: any, square: string): boolean;
        remove(square: string): any;
        reset(): void;
        square_color(square: string): 'light' | 'dark' | null;
        turn(): 'b' | 'w';
        undo(): any | null;
        validate_fen(fen: string): any;
    }
}
