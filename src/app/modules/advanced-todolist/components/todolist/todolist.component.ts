import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ITodoItem } from '../../types/types';

@Component({
  selector: 'todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  @Input() todos: ITodoItem[] | null = null;

  public form: FormGroup = new FormGroup({
    todo: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
