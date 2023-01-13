import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../../types/types';

@Component({
  selector: 'chessfield',
  templateUrl: './chessfield.component.html',
  styleUrls: ['./chessfield.component.scss']
})
export class ChessfieldComponent implements OnInit {
  @Input() data: Field;
  constructor() { }

  ngOnInit(): void {
  }

}
