import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTurnosComponent } from './modal-turnos.component';

describe('ModalTurnosComponent', () => {
  let component: ModalTurnosComponent;
  let fixture: ComponentFixture<ModalTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
