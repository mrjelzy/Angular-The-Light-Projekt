import { TestBed } from '@angular/core/testing';

import { CollectionFacadeService } from './collection-facade.service';

describe('CollectionFacadeService', () => {
  let service: CollectionFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
