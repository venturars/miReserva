import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfdeRestauranteComponent } from './modal-infde-restaurante.component';

describe('ModalInfdeRestauranteComponent', () => {
  let component: ModalInfdeRestauranteComponent;
  let fixture: ComponentFixture<ModalInfdeRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfdeRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfdeRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
