import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../../types/types';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {
  @Input() fields: Field[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log({fields: this.fields});
  }

  public clickField(fieldID: number) {
    console.log({fieldID});
  }

}
