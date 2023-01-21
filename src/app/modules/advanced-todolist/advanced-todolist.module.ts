import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedTodolistComponent } from './advanced-todolist.component';



@NgModule({
  declarations: [
    AdvancedTodolistComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdvancedTodolistComponent
  ]
})
export class AdvancedTodolistModule { }
