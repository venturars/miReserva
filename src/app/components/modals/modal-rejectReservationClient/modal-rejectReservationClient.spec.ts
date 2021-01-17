import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectReservationClientComponent } from './modal-rejectReservationClient';

describe('ModalClienteComponent', () => {
  let component: RejectReservationClientComponent;
  let fixture: ComponentFixture<RejectReservationClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectReservationClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectReservationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
