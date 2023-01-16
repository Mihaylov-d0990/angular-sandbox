import { Injectable } from '@angular/core';
import { cloneDeep, isNil, range } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Field, Piece, PieceColor, PieceType } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class ChessMovesService {
  private readonly indexRange: number[] = range(0, 64);
  private allowedMoves$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor() { };

  public getAllowedMoves$(): BehaviorSubject<number[]> {
    return this.allowedMoves$;
  }

  public move(
    currentPositionIndex: number,
    nextPositionIndex: number,
    fields: Field[]
  ): Field[]  {
    const newFields = cloneDeep(fields);

    if (
      isNil(currentPositionIndex) 
      || isNil(nextPositionIndex)
    ) { return newFields; }
    
    if (newFields[currentPositionIndex].piece?.color === newFields[nextPositionIndex].piece?.color) {
      return newFields;
    }

    if (this.allowedMoves$.value.includes(nextPositionIndex)) {
      newFields[nextPositionIndex].piece = {...newFields[currentPositionIndex].piece} as Piece
      newFields[currentPositionIndex].piece = null;      
    }

    this.allowedMoves$.next([]);
    
    return newFields;
  }

  public calcAllowedMoves(currentFieldIndex: number, fields: Field[]) {
    if (!currentFieldIndex || !fields || !this.indexRange.includes(currentFieldIndex)) { 
      return;
    }

    let moves: number[] = [];

    switch(fields[currentFieldIndex].piece?.type) {
      case PieceType.pawn:
        moves = [...this.calcPawnMoves(currentFieldIndex, fields)]
        break;
      default:
        moves = [];
    }

    this.allowedMoves$.next([...moves].filter(move => this.indexRange.includes(move)))
  }

  private calcPawnMoves(index: number, fields: Field[]): number[] {
    const moves: number[] = [];
    const white = fields[index].piece?.color === PieceColor.white;
    const firstMove = white ? 47 < index && index < 56 : 7 < index && index < 16;

    const oneStepIndex = white ? index - 8 : index + 8;
    if (!fields[oneStepIndex]?.piece) {
      moves.push(oneStepIndex);
    }

    const twoStepIndex = white ? index - 16 : index + 16
    if (firstMove && !fields[twoStepIndex]?.piece) {
      moves.push(twoStepIndex);
    }

    const cutRightIndex = white ? index - 7 : index + 9;
    if (
      fields[cutRightIndex]?.piece?.color !== fields[index].piece?.color
      && fields[cutRightIndex]?.piece
      && (index + 1) % 8 !== 0
    ) {
      moves.push(cutRightIndex)
    }

    const cutLeftIndex = white ? index - 9 : index + 7;
    if (
      fields[cutLeftIndex]?.piece?.color !== fields[index].piece?.color
      && fields[cutLeftIndex]?.piece
      && index % 8 !== 0
    ) {
      moves.push(cutLeftIndex)
    }

    return moves;
  }
}
