import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Input() years: number[] = [];
  @Output() addNewYear = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public addYear() {
    this.addNewYear.emit();
  }

}
