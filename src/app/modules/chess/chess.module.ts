import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessComponent } from './chess.component';
import { ChessboardComponent } from './components/chessboard/chessboard.component';
import { ChessfieldComponent } from './components/chessfield/chessfield.component';
import { ChessService } from './services/chess.service';



@NgModule({
  providers: [
    ChessService,
  ],
  declarations: [
    ChessComponent,
    ChessboardComponent,
    ChessfieldComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ChessComponent,
  ]
})
export class ChessModule { }
