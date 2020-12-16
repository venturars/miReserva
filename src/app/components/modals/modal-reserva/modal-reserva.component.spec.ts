import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReservaComponent } from './modal-reserva.component';

describe('ModalReservaComponent', () => {
  let component: ModalReservaComponent;
  let fixture: ComponentFixture<ModalReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
