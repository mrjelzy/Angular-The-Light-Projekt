import { TestBed } from '@angular/core/testing';

import { OrderTrackingFacadeService } from './order-tracking-facade.service';

describe('OrderTrackingFacadeService', () => {
  let service: OrderTrackingFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderTrackingFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
