import { TestBed } from '@angular/core/testing';

import { SecretaireServiceService } from './secretaire-service.service';

describe('SecretaireServiceService', () => {
  let service: SecretaireServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecretaireServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
