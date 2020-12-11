import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestaurantHeaderComponent } from './create-restaurant-header.component';

describe('CreateRestaurantHeaderComponent', () => {
  let component: CreateRestaurantHeaderComponent;
  let fixture: ComponentFixture<CreateRestaurantHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRestaurantHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRestaurantHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
