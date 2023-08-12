import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemOptionsComponent } from './cart-item-options.component';

describe('CartItemOptionsComponent', () => {
  let component: CartItemOptionsComponent;
  let fixture: ComponentFixture<CartItemOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartItemOptionsComponent]
    });
    fixture = TestBed.createComponent(CartItemOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
