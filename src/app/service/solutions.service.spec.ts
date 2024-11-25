import { TestBed } from '@angular/core/testing';

import { SolutionsService } from './solutions.service';

describe('SolutionsService', () => {
  let service: SolutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
