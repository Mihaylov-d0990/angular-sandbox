import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChessModule } from './modules/chess/chess.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvancedTodolistModule } from './modules/advanced-todolist/advanced-todolist.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChessModule,
    AdvancedTodolistModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
