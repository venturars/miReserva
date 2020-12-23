import { TestBed } from '@angular/core/testing';

import { ServiceAPIService } from './service-api.service';

describe('ServiceAPIService', () => {
  let service: ServiceAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
