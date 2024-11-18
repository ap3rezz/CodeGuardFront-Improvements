import { TestBed } from '@angular/core/testing';

import { AuthKeyService } from './auth-key.service';

describe('AuthKeyService', () => {
  let service: AuthKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
