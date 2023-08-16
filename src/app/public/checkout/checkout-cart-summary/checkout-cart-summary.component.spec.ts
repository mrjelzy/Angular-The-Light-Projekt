import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCartSummaryComponent } from './checkout-cart-summary.component';

describe('CheckoutCartSummaryComponent', () => {
  let component: CheckoutCartSummaryComponent;
  let fixture: ComponentFixture<CheckoutCartSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutCartSummaryComponent]
    });
    fixture = TestBed.createComponent(CheckoutCartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
