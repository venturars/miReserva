import { TestBed } from '@angular/core/testing';

import { ServiceUsersService } from './service-users.service';

describe('ServiceUsersService', () => {
  let service: ServiceUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
