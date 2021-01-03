import { TestBed } from '@angular/core/testing';

import { ServiceSearchService } from './service-search.service';

describe('ServiceSearchService', () => {
  let service: ServiceSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
