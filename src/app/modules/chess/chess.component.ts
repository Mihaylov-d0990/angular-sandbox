import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChessService } from './services/chess.service';
import { Field } from './types/types';

@Component({
  selector: 'chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {
  public fields$: Observable<Field[]>;

  constructor(
    private chessS: ChessService,
  ) {
    this.fields$ = chessS.getFields$();
  }

  ngOnInit(): void {

  }

}
