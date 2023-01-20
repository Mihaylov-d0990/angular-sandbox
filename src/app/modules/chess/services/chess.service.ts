import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Field, } from '../types/types';
import { range } from 'lodash';
import { ChessMovesService } from './chess-moves.service';

@Injectable({
  providedIn: 'root'
})
export class ChessService {
  private fields$: BehaviorSubject<Field[]> = new BehaviorSubject<Field[]>([]);
  private fields: Field[];
  private currentPiece: Field | null;

  public setCurrentPiece(field: Field | null) {
    if (field?.piece) {
      this.currentPiece = field;
      this.chessMovesS.calcAllowedMoves(field.id, this.fields);
      return;
    }

    if (this.currentPiece && field) {
      this.move(field);
    }
  }

  private move(field: Field): void {
    const currentFieldIndex = this.fields.findIndex(f => f.id === this.currentPiece?.id);
    const nextFieldIndex = this.fields.findIndex(f => f.id === field.id);
    if (currentFieldIndex !== -1 && nextFieldIndex !== -1) {
      this.fields = this.chessMovesS.move(currentFieldIndex, nextFieldIndex, this.fields);
      this.fields$.next(this.fields);
      this.currentPiece = null;
    }
  }

  constructor(
    private chessMovesS: ChessMovesService,
  ) {
    this.initFields();
  }

  public getFields$(): BehaviorSubject<Field[]> {
    return this.fields$
  }

  public getAllowedMoves$(): BehaviorSubject<number[]> {
    return this.chessMovesS.getAllowedMoves$();
  }

  public getCheckFieldIndex$(): BehaviorSubject<number> {
    return this.chessMovesS.getCheckFieldIndex$()
  }

  private initFields(): void {
    const newFields: Field[] = range(64).map(
      (index: number) => ({
        id: index,
        piece: null 
      })
    );

    for (let index = 8; index < 16; index++) {
      newFields[index].piece = {
        color: 'black',
        type: 'pawn'
      }
    }

    newFields[0].piece = {
      color: 'black',
      type: 'rook'
    }

    newFields[1].piece = {
      color: 'black',
      type: 'knight'
    }

    newFields[2].piece = {
      color: 'black',
      type: 'bishop'
    }

    newFields[3].piece = {
      color: 'black',
      type: 'queen'
    }

    newFields[4].piece = {
      color: 'black',
      type: 'king'
    }

    newFields[5].piece = {
      color: 'black',
      type: 'bishop'
    }

    newFields[6].piece = {
      color: 'black',
      type: 'knight'
    }

    newFields[7].piece = {
      color: 'black',
      type: 'rook'
    }

    for (let index = 48; index < 56; index++) {
      newFields[index].piece = {
        color: 'white',
        type: 'pawn'
      }
    }

    newFields[56].piece = {
      color: 'white',
      type: 'rook'
    }

    newFields[57].piece = {
      color: 'white',
      type: 'knight'
    }

    newFields[58].piece = {
      color: 'white',
      type: 'bishop'
    }

    newFields[59].piece = {
      color: 'white',
      type: 'queen'
    }

    newFields[60].piece = {
      color: 'white',
      type: 'king'
    }

    newFields[61].piece = {
      color: 'white',
      type: 'bishop'
    }

    newFields[62].piece = {
      color: 'white',
      type: 'knight'
    }

    newFields[63].piece = {
      color: 'white',
      type: 'rook'
    }

    this.fields = [...newFields];
    this.fields$.next(this.fields);
  }
}


