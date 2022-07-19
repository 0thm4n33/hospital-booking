import { TestBed } from '@angular/core/testing';

import { RdvServiceService } from './rdv-service.service';

describe('RdvServiceService', () => {
  let service: RdvServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdvServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
