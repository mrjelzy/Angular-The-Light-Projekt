import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginOrGuestComponent } from './login-or-guest/login-or-guest.component';
import { GuestComponent } from './guest/guest.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { AddressComponent } from './address/address.component';
import { ShippingMethodComponent } from './shipping-method/shipping-method.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutLayoutComponent } from './checkout-layout/checkout-layout.component';
import { RouterModule } from '@angular/router';
import { CheckoutCartSummaryComponent } from './checkout-cart-summary/checkout-cart-summary.component';
import { CheckoutProgressBarComponent } from './checkout-progress-bar/checkout-progress-bar.component';
import { PaymentComponent } from './payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';



@NgModule({
    declarations: [
        LoginOrGuestComponent,
        GuestComponent,
        PrescriptionComponent,
        AddressComponent,
        ShippingMethodComponent,
        CheckoutLayoutComponent,
        CheckoutCartSummaryComponent,
        CheckoutProgressBarComponent,
        PaymentComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxStripeModule.forRoot('pk_test_51NiI08C3vGjYEX43PVfWk0gelQf6gTUdw0xpWahbfafCzzRXZJhwn93LwRfY8fybXTesAr3ogW0iN8JR9XCzd9r000kReb0ONV'),
    ]
})
export class CheckoutModule { }