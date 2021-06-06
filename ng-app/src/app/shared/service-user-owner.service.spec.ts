import { TestBed } from '@angular/core/testing';

import { ServiceUserOwnerService } from './service-user-owner.service';

describe('ServiceUserOwnerService', () => {
  let service: ServiceUserOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUserOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
