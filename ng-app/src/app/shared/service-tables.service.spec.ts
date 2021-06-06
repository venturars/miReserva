import { TestBed } from '@angular/core/testing';

import { ServiceTablesService } from './service-tables.service';

describe('ServiceTablesService', () => {
  let service: ServiceTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
