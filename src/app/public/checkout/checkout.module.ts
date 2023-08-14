import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginOrGuestComponent } from './login-or-guest/login-or-guest.component';
import { GuestComponent } from './guest/guest.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { AddressComponent } from './address/address.component';
import { ShippingMethodComponent } from './shipping-method/shipping-method.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
    declarations: [
        LoginOrGuestComponent,
        GuestComponent,
        PrescriptionComponent,
        AddressComponent,
        ShippingMethodComponent
    ],
    imports: [
        CommonModule,
        CoreModule
    ]
})
export class CheckoutModule { }
