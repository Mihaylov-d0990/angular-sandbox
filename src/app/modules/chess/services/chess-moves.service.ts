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
  private checkFieldIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  private readonly moveMethods = {
    [PieceType.pawn]: this.calcPawnMoves,
    [PieceType.rook]: this.calcRookMoves,
    [PieceType.bishop]: this.calcBishopMoves,
    [PieceType.knight]: this.calcKnightMoves,
    [PieceType.queen]: this.calcQueenMoves,
    [PieceType.king]: this.calcKingMoves
  };

  constructor() {};

  public getAllowedMoves$(): BehaviorSubject<number[]> {
    return this.allowedMoves$;
  }

  public getCheckFieldIndex$(): BehaviorSubject<number> {
    return this.checkFieldIndex$;
  }

  public move(currentIndex: number, nextIndex: number, fields: Field[]): Field[]  {
    const newFields = cloneDeep(fields);

    if (this.allowedMoves$.value.includes(nextIndex)) {
      newFields[nextIndex].piece = {...newFields[currentIndex].piece} as Piece
      newFields[currentIndex].piece = null;      
      this.checkFieldIndex$.next(this.calcCheck(nextIndex, newFields));
    }

    this.allowedMoves$.next([]);
    
    return newFields;
  }

  private fakeMove(currentIndex: number, nextIndex: number, fields: Field[]): Field[] {
    const newFields = cloneDeep(fields);

    newFields[nextIndex].piece = {...newFields[currentIndex].piece} as Piece
    newFields[currentIndex].piece = null; 
    
    return newFields;
  }

  private calcCheck(fieldIndex: number, fields: Field[]): number {
    if (isNil(fieldIndex) || !fields || !this.indexRange.includes(fieldIndex)) { 
      return -1;
    }

    if (!isNil(fields[fieldIndex].piece)) {
      const pieceType = fields[fieldIndex].piece!.type;
      const pieceColor = fields[fieldIndex].piece!.color;
      
      if (!this.moveMethods[pieceType]) { return -1; } 

      const moveMethod = this.moveMethods[pieceType].bind(this);
      const moves: number[] = moveMethod(fieldIndex, fields);

      for (let index = 0; index < moves.length; index++) {
        if (
          fields[moves[index]].piece?.color !== pieceColor &&
          fields[moves[index]].piece?.type === PieceType.king
        ) {
          return moves[index];
        }
      }
    }

    return -1;
  }

  private isNextMoveNotBeCheck(currentIndex: number, nextIndex: number, fields: Field[]) {
    const newFields: Field[] = this.fakeMove(currentIndex, nextIndex, fields);
    const color: keyof typeof PieceColor = newFields[nextIndex].piece!.color;

    const differentColorPiecesIndexes: number[] = fields.filter(
      field => field.piece && field.piece.color !== color ? true : false
    ).map(field => field.id);

    return !differentColorPiecesIndexes.find(index => this.calcCheck(index, newFields) !== -1);
  }

  public calcAllowedMoves(currentIndex: number, fields: Field[]) {
    if (!isNil(fields[currentIndex].piece)) {
      const pieceType = fields[currentIndex].piece!.type;
      
      if (!this.moveMethods[pieceType]) { return; } 

      const moveMethod = this.moveMethods[pieceType].bind(this);

      const moves: number[] = moveMethod(
        currentIndex, fields
      ).filter(
        index => this.isNextMoveNotBeCheck(currentIndex, index, fields)
      );

      const checkIndex = this.calcCheck(currentIndex, fields)

      if (checkIndex !== -1) {
        moves.splice(moves.findIndex(move => move === checkIndex), 1);
      }

      this.allowedMoves$.next([...moves].filter(move => this.indexRange.includes(move)));      
    }
  }

  private calcPawnMoves(index: number, fields: Field[]): number[] {
    const moves: number[] = [];
    const white = fields[index].piece?.color === PieceColor.white;
    const firstMove = white ? 47 < index && index < 56 : 7 < index && index < 16;

    const oneStepIndex = white ? index - 8 : index + 8;
    const twoStepIndex = white ? index - 16 : index + 16

    if (!fields[oneStepIndex]?.piece) {
      moves.push(oneStepIndex);

      if (firstMove && !fields[twoStepIndex]?.piece) {
        moves.push(twoStepIndex);
      }
    }

    const cutRightIndex = white ? index - 7 : index + 9;
    if (
      fields[index].piece?.color !== fields[cutRightIndex]?.piece?.color
      && !!fields[cutRightIndex]?.piece
      && (index + 1) % 8 !== 0
    ) {
      moves.push(cutRightIndex);
    }

    const cutLeftIndex = white ? index - 9 : index + 7;
    if (
      fields[index].piece?.color !== fields[cutLeftIndex]?.piece?.color
      && !!fields[cutLeftIndex]?.piece
      && index % 8 !== 0
    ) {
      moves.push(cutLeftIndex);
    }

    return moves;
  }

  private calcRookMoves(index: number, fields: Field[]): number[] {
    const moves: number[] = [];

    for (let i = index + 8; i < 64; i += 8) {
      if (this.dynamicCalc(moves, fields, index, i)) { break; }
    }

    for (let i = index - 8; i >= 0 ; i -= 8) {
      if (this.dynamicCalc(moves, fields, index, i)) { break; }
    }

    for (let i = index + 1; i < 64; i++) {
      if ((index + 1) % 8 === 0) { break; }
      if (this.dynamicCalc(moves, fields, index, i)) { break; }
      if ((i + 1) % 8 === 0) { break; }
    }

    for (let i = index - 1; i >= 0; i--) {
      if (index % 8 === 0) { break; }
      if (this.dynamicCalc(moves, fields, index, i)) { break; }
      if (i % 8 === 0) { break; }
    }

    return moves;
  }

  private calcBishopMoves(index: number, fields: Field[]): number[] {
    const moves: number[] = [];

    for (let i = index - 7; i >= 0; i -= 7) {
      if ((index - 7) % 8 === 0) { break; }
      if (this.dynamicCalc(moves, fields, index, i)) { break; }
      if ((i - 7) % 8 === 0) { break; }
    }

    for (let i = index - 9; i >= 0; i -= 9) {
      if (index % 8 === 0) { break; }
      if (this.dynamicCalc(moves, fields, index, i)) { break; }
      if (i % 8 === 0) { break; }
    }

    for (let i = index + 7; i < 64; i += 7) {
      if (index % 8 === 0) { break; }
      if (this.dynamicCalc(moves, fields, index, i)) { break; }
      if (i % 8 === 0) { break; }
    }

    for (let i = index + 9; i < 64; i += 9) {
      if ((index + 9) % 8 === 0) { break; }
      if (this.dynamicCalc(moves, fields, index, i)) { break; }
      if ((i + 9) % 8 === 0) { break; }
    }

    return moves;
  }

  private calcKnightMoves(index: number, fields: Field[]): number[] {
    const moves: number[] = [];
    const moveIndexes: number[] = [6, 10, 15, 17];
    const farRight: number[] = [-15, -6, 10, 17];
    const closeRight: number[] = [-6, 10];
    const farLeft: number[] = [-17, -10, 6, 15];
    const closeLeft: number[] = [-10, 6];

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < moveIndexes.length; j++) {

        const calcIndex = moveIndexes[j] * (i % 2 === 0 ? 1 : -1);
        const moveIndex = index + calcIndex;

        if (moveIndex < 0 || moveIndex > 63) { continue; }

        if (index % 8 === 0 && farLeft.includes(calcIndex)) { continue; }
        if ((index - 1) % 8 === 0 && closeLeft.includes(calcIndex)) { continue; }

        if ((index + 1) % 8 === 0 && farRight.includes(calcIndex)) { continue; }
        if ((index + 2) % 8 === 0 && closeRight.includes(calcIndex)) { continue; }

        if (fields[index].piece?.color !== fields[moveIndex].piece?.color) {
          moves.push(moveIndex);
        }

      }
    }

    return moves;
  }

  private calcQueenMoves(index: number, fields: Field[]): number[] {
    return [...this.calcBishopMoves(index, fields), ...this.calcRookMoves(index, fields)];
  }

  private calcKingMoves(index: number, fields: Field[]): number[] {
    const moves: number[] = [];
    const moveIndexes: number[] = [1, 7, 8, 9];
    const left: number[] = [-9, -1, 7];
    const right: number[] = [-7, 1, 9];

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < moveIndexes.length; j++) {

        const calcIndex = moveIndexes[j] * (i % 2 === 0 ? 1 : -1);
        const moveIndex = index + calcIndex;

        if (moveIndex < 0 || moveIndex > 63) { continue; }

        if (index % 8 === 0 && left.includes(calcIndex)) { continue; }

        if ((index + 1) % 8 === 0 && right.includes(calcIndex)) { continue; }

        if (fields[index].piece?.color !== fields[moveIndex].piece?.color) {
          moves.push(moveIndex);
        }

      }
    }

    return moves;
  }

  private dynamicCalc(moves: number[], fields: Field[], currentIndex: number, fieldIndex: number): boolean {
    if (!!fields[fieldIndex].piece) {
      if (fields[fieldIndex].piece?.color !== fields[currentIndex].piece?.color) {
        moves.push(fieldIndex);
      }
      return true;
    }
    moves.push(fieldIndex);
    return false;
  }
}
