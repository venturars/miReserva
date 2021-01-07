import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarioIncorrectoComponent } from './modal-usuario-incorrecto.component';

describe('ModalUsuarioIncorrectoComponent', () => {
  let component: ModalUsuarioIncorrectoComponent;
  let fixture: ComponentFixture<ModalUsuarioIncorrectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUsuarioIncorrectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUsuarioIncorrectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
