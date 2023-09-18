import { TestBed } from '@angular/core/testing';

import { FaqFacadeService } from './faq-facade.service';

describe('FaqFacadeService', () => {
  let service: FaqFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
