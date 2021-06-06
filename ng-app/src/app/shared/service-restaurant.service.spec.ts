import { TestBed } from '@angular/core/testing';

import { ServiceRestaurantService } from './service-restaurant.service';

describe('ServiceRestaurantService', () => {
  let service: ServiceRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
