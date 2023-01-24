import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedTodolistComponent } from './advanced-todolist.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { TodolistService } from './services/todolist.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdvancedTodolistComponent,
    TodolistComponent,
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    AdvancedTodolistComponent
  ],
  providers: [
    TodolistService
  ]
})
export class AdvancedTodolistModule { }
