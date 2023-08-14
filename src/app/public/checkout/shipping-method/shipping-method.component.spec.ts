import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingMethodComponent } from './shipping-method.component';

describe('ShippingMethodComponent', () => {
  let component: ShippingMethodComponent;
  let fixture: ComponentFixture<ShippingMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingMethodComponent]
    });
    fixture = TestBed.createComponent(ShippingMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
