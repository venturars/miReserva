import { TestBed } from '@angular/core/testing';

import { ServiceReservationsService } from './service-reservations.service';

describe('ServiceReservationsService', () => {
  let service: ServiceReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceReservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
