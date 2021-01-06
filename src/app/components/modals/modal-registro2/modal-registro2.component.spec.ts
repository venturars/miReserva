import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistro2Component } from './modal-registro2.component';

describe('ModalRegistro2Component', () => {
  let component: ModalRegistro2Component;
  let fixture: ComponentFixture<ModalRegistro2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistro2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistro2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
