import { Component, OnInit } from '@angular/core';
import { TodolistService } from './services/todolist.service';
import { ITodoItem } from './types/types';

@Component({
  selector: 'advanced-todolist',
  templateUrl: './advanced-todolist.component.html',
  styleUrls: ['./advanced-todolist.component.scss']
})
export class AdvancedTodolistComponent implements OnInit {

  constructor(
    private todolistS: TodolistService,
  ) { }

  public todos: ITodoItem[] | null = null;
  public years: number[] = [];

  ngOnInit(): void {
    this.initializeTodos();
    this.initializeYears();
  }

  public addNewYear() {
    this.todolistS.addYear$(this.years)
    .subscribe({
      next: years => this.years = years,
      error: error => console.error(error)
    });
  }

  private initializeTodos() {
    this.todos = null;
    this.todolistS.getTodoItems$()
    .subscribe({
      next: todos => this.todos = todos,
      error: error => console.error(error)
    });
  }

  private initializeYears() {
    this.todolistS.getYear$()
    .subscribe({
      next: years => this.years = years,
      error: error => console.error(error)
    });
  }

}
