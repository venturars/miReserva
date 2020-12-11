import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestaurant3Component } from './create-restaurant3.component';

describe('CreateRestaurant3Component', () => {
  let component: CreateRestaurant3Component;
  let fixture: ComponentFixture<CreateRestaurant3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRestaurant3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRestaurant3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
