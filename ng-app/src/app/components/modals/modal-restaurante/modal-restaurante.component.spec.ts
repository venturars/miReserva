import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRestauranteComponent } from './modal-restaurante.component';

describe('ModalRestauranteComponent', () => {
  let component: ModalRestauranteComponent;
  let fixture: ComponentFixture<ModalRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
