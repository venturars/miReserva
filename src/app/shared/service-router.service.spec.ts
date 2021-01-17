import { TestBed } from '@angular/core/testing';

import { ServiceRouterService } from './service-router.service';

describe('ServiceRouterService', () => {
  let service: ServiceRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
