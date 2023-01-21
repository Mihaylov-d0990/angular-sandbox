import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedTodolistComponent } from './advanced-todolist.component';

describe('AdvancedTodolistComponent', () => {
  let component: AdvancedTodolistComponent;
  let fixture: ComponentFixture<AdvancedTodolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedTodolistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedTodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
