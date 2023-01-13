import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessfieldComponent } from './chessfield.component';

describe('ChessfieldComponent', () => {
  let component: ChessfieldComponent;
  let fixture: ComponentFixture<ChessfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessfieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChessfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
