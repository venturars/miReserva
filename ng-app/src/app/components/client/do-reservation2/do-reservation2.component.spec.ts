import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoReservation2Component } from './do-reservation2.component';

describe('DoReservation2Component', () => {
  let component: DoReservation2Component;
  let fixture: ComponentFixture<DoReservation2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoReservation2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoReservation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
