import { TestBed } from '@angular/core/testing';

import { ServiceCalendarService } from './service-calendar.service';

describe('ServiceCalendarService', () => {
  let service: ServiceCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
