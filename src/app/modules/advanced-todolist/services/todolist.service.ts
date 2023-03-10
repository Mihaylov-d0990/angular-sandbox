import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { from, map, Observable } from 'rxjs';
import { ITodoItem, TodoItem } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private dataBase;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBDfVMq4N-yVNbMF7sb3TO0MHMHaupAZvE",
      authDomain: "sandbox-bec0b.firebaseapp.com",
      projectId: "sandbox-bec0b",
      storageBucket: "sandbox-bec0b.appspot.com",
      messagingSenderId: "762304835347",
      appId: "1:762304835347:web:e7d8affac301c596b734e6"
    };
    
    this.dataBase = getFirestore(initializeApp(firebaseConfig));
  }

  public getTodoItems$(): Observable<ITodoItem[]> {
    return from(
      getDocs(collection(this.dataBase, 'todolist'))
    ).pipe(
      map(todosSnapshot => todosSnapshot.docs.map((todo: any) => new TodoItem(todo.data())))
    );
  }

  public addTodoItem$(todo: ITodoItem): Observable<any> {
    return from(
      addDoc(collection(this.dataBase, 'todolist'), todo)
    );
  }

  public getYear$(): Observable<number[]> {
    return from(
      getDocs(collection(this.dataBase, 'years'))
    ).pipe(
      map(yearsSnapshot => {
        return yearsSnapshot.docs.map((year: any) => year.data()?.year)
          .filter(year => !!year).sort();
      })
    );
  }

  public addYear$(years: number[]): Observable<number[]> {
    const maxYear = Math.max(...years);
    const newYear = maxYear ? maxYear + 1 : new Date().getFullYear();
    return new Observable(observer => {
      from(
        addDoc(collection(this.dataBase, 'years'), {year: newYear})
      ).subscribe({
        next: () => {
          observer.next([...years, newYear].sort());
          observer.complete();
        },
        error: error => {
          observer.error(error);
          observer.complete();
        }
      });
    })
  }

}
