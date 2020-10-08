import { TestBed } from '@angular/core/testing';

import { TraductionService } from './traduction.service';

describe('TraductionService', () => {
  let service: TraductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
