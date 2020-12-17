import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReservaManualComponent } from './modal-reserva-manual.component';

describe('ModalReservaManualComponent', () => {
  let component: ModalReservaManualComponent;
  let fixture: ComponentFixture<ModalReservaManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReservaManualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReservaManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
