import { Component, OnInit } from '@angular/core';
import { TodolistService } from './services/todolist.service';

@Component({
  selector: 'advanced-todolist',
  templateUrl: './advanced-todolist.component.html',
  styleUrls: ['./advanced-todolist.component.scss']
})
export class AdvancedTodolistComponent implements OnInit {

  constructor(
    private todolistS: TodolistService,
  ) { }

  ngOnInit(): void {
    this.todolistS.getTodoItems().subscribe({
      next: todos => {
        console.log({todos});
      }
    })
  }

}
