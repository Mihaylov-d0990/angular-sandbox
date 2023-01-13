import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessComponent } from './chess.component';
import { ChessboardComponent } from './components/chessboard/chessboard.component';
import { ChessfieldComponent } from './components/chessfield/chessfield.component';



@NgModule({
  declarations: [
    ChessComponent,
    ChessboardComponent,
    ChessfieldComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChessModule { }
