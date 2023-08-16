import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutLayoutComponent } from './checkout-layout.component';

describe('CheckoutLayoutComponent', () => {
  let component: CheckoutLayoutComponent;
  let fixture: ComponentFixture<CheckoutLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutLayoutComponent]
    });
    fixture = TestBed.createComponent(CheckoutLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
