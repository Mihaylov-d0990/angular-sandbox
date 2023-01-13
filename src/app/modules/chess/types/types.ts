export enum PieceType {
  'pawn' = 'pawn',
  'knight' = 'knight',
  'bishop' = 'bishop',
  'rook' = 'rook',
  'king' = 'king',
  'queen' = 'queen'
}

export enum PieceColor {
  'white' = 'white',
  'black' = 'black'
}

export interface Piece {
  type: keyof typeof PieceType
  color: keyof typeof PieceColor
}

export interface Field {
  id: number,
  piece: Piece | null
}
