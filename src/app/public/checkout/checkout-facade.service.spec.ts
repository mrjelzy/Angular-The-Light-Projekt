import { TestBed } from '@angular/core/testing';

import { CheckoutFacadeService } from './checkout-facade.service';

describe('CheckoutFacadeService', () => {
  let service: CheckoutFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
