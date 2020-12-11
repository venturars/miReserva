import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestaurant2Component } from './create-restaurant2.component';

describe('CreateRestaurant2Component', () => {
  let component: CreateRestaurant2Component;
  let fixture: ComponentFixture<CreateRestaurant2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRestaurant2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRestaurant2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
