import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChessService } from '../../services/chess.service';
import { Field } from '../../types/types';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {
  public fields$: BehaviorSubject<Field[]>;
  public allowedMoves$: BehaviorSubject<number[]>;

  constructor(
    private chessS: ChessService,
  ) { }

  ngOnInit(): void {
    this.fields$ = this.chessS.getFields$();
    this.allowedMoves$ = this.chessS.getAllowedMoves$();
  }

  public clickField(field: Field) {
    this.chessS.currentPiece = field;
  }

}
