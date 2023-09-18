import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemOptionsComponent } from './order-item-options.component';

describe('OrderItemOptionsComponent', () => {
  let component: OrderItemOptionsComponent;
  let fixture: ComponentFixture<OrderItemOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderItemOptionsComponent]
    });
    fixture = TestBed.createComponent(OrderItemOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
