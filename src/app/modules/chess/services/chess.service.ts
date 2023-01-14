import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Field } from '../types/types';
import { range } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ChessService {
  private fields$: Observable<Field[]>;
  

  constructor() {
    this.initFields();
  }

  public getFields$(): Observable<Field[]> {
    return this.fields$
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

    this.fields$ = of([...newFields]);
  }
}


