import { TestBed } from '@angular/core/testing';

import { ServiceShiftsService } from './service-shifts.service';

describe('ServiceShiftsService', () => {
  let service: ServiceShiftsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceShiftsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
