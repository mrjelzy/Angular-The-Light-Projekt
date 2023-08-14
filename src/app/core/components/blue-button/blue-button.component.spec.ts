import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueButtonComponent } from './blue-button.component';

describe('BlueButtonComponent', () => {
  let component: BlueButtonComponent;
  let fixture: ComponentFixture<BlueButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlueButtonComponent]
    });
    fixture = TestBed.createComponent(BlueButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
