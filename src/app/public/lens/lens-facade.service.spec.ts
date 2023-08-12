import { TestBed } from '@angular/core/testing';

import { LensFacadeService } from './lens-facade.service';

describe('LensFacadeService', () => {
  let service: LensFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LensFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
