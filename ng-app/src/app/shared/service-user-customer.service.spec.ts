import { TestBed } from '@angular/core/testing';

import { ServiceUserCustomerService } from './service-user-customer.service';

describe('ServiceUserCustomerService', () => {
  let service: ServiceUserCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUserCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
