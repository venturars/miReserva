import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUserRestaurantComponent } from './navbar-user-restaurant.component';

describe('NavbarUserRestaurantComponent', () => {
  let component: NavbarUserRestaurantComponent;
  let fixture: ComponentFixture<NavbarUserRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarUserRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarUserRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
