import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTodoComponent } from './modal-todo.component';

describe('ModalTodoComponent', () => {
  let component: ModalTodoComponent;
  let fixture: ComponentFixture<ModalTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTodoComponent]
    });
    fixture = TestBed.createComponent(ModalTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
