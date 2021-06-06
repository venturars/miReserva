import { TestBed } from '@angular/core/testing';

import { ServiceRegistrationService } from './service-registration.service';

describe('ServiceRegistrationService', () => {
  let service: ServiceRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
