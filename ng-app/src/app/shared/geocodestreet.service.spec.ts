import { TestBed } from '@angular/core/testing';

import { GeocodestreetService } from './geocodestreet.service';

describe('GeocodestreetService', () => {
  let service: GeocodestreetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeocodestreetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
