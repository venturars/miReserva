import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoReservationHeaderComponent } from './do-reservation-header.component';

describe('DoReservationHeaderComponent', () => {
  let component: DoReservationHeaderComponent;
  let fixture: ComponentFixture<DoReservationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoReservationHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoReservationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
