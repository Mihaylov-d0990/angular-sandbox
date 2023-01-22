import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedTodolistComponent } from './advanced-todolist.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';



@NgModule({
  declarations: [
    AdvancedTodolistComponent,
    TodolistComponent,
    DatePickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdvancedTodolistComponent
  ]
})
export class AdvancedTodolistModule { }
