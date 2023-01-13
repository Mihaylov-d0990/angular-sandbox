import { Injectable } from '@angular/core';
import { Observable, map, of, reduce, range, concatMap } from 'rxjs';
import { Field } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class ChessService {
  private fields$: Observable<Field[]> = range(64).pipe(
    map((index: number) => ({
      id: index,
      piece: null 
    })),
    reduce<Field, Field[]>((acc: Field[], value: Field) => [...acc, value], []),
    concatMap<Field[], Observable<Field[]>>((fields: Field[]) => of(fields))
  );
  

  constructor() { }

  public getFields$(): Observable<Field[]> {
    return this.fields$
  }
}


