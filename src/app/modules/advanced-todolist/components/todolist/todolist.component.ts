import { Component, OnInit, Input } from '@angular/core';
import { ITodoItem } from '../../types/types';

@Component({
  selector: 'todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  @Input() todos: ITodoItem[] | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
