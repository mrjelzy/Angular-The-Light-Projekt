import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './public/collection/collection/collection.component';
import { LenseComponent } from './public/lens/lense/lense.component';
import { ProductComponent } from './public/product/product/product.component';
import { CartComponent } from './public/cart/cart/cart.component';
import { LoginOrGuestComponent } from './public/checkout/login-or-guest/login-or-guest.component';
import { GuestComponent } from './public/checkout/guest/guest.component';
import { CartEmptyGuard } from './core/guards/cart-empty.guard';
import { AddressComponent } from './public/checkout/address/address.component';
import { PrescriptionComponent } from './public/checkout/prescription/prescription.component';

const routes: Routes = [
  { path: 'collections', component: CollectionComponent },
  { path: 'collections/:slug', component: CollectionComponent },
  { path: 'products/:slug', component: ProductComponent },
  { path: 'rx-service', component: LenseComponent },
  { path: 'cart', component:  CartComponent},
  { path: 'checkout', component:  LoginOrGuestComponent, /* canActivate: [CartEmptyGuard] */},
  { path: 'checkout/guest', component:  GuestComponent, /* canActivate: [CartEmptyGuard] */},
  { path: 'checkout/address', component:  AddressComponent, /* canActivate: [CartEmptyGuard] */},
  { path: 'checkout/prescription', component:  PrescriptionComponent, /* canActivate: [CartEmptyGuard] */},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
