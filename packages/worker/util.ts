export enum Color {
    White,
    Black,
}

export function turn(fen: string): Color {
    switch (fen.split(' ')[1]) {
        case 'w': return Color.White;
        case 'b': return Color.Black;
        default: throw new Error('Invalid fen');
    }
}

export function rand(min: number, max: number): number {
    return min + (max - min) * Math.random();
}
