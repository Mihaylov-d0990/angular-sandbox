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
  public checkFieldIndex$: BehaviorSubject<number>;

  constructor(
    private chessS: ChessService,
  ) { }

  ngOnInit(): void {
    this.fields$ = this.chessS.getFields$();
    this.allowedMoves$ = this.chessS.getAllowedMoves$();
    this.checkFieldIndex$ = this.chessS.getCheckFieldIndex$();
  }

  public clickField(field: Field) {
    this.chessS.setCurrentPiece(field);
  }
}
