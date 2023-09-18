import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackingResultComponent } from './order-tracking-result.component';

describe('OrderTrackingResultComponent', () => {
  let component: OrderTrackingResultComponent;
  let fixture: ComponentFixture<OrderTrackingResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderTrackingResultComponent]
    });
    fixture = TestBed.createComponent(OrderTrackingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
