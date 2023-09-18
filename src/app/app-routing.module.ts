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
import { CheckoutLayoutComponent } from './public/checkout/checkout-layout/checkout-layout.component';
import { PaymentComponent } from './public/checkout/payment/payment.component';
import { ConfirmationComponent } from './public/checkout/confirmation/confirmation.component';
import { HomepageComponent } from './public/home/homepage/homepage.component';
import { ContactPageComponent } from './public/contact/contact-page/contact-page.component';
import { OrderTrackingPageComponent } from './public/order-tracking/order-tracking-page/order-tracking-page.component';
import { SimplePageComponent } from './public/page/simple-page/simple-page.component';
import { FaqPageComponent } from './public/faq/faq-page/faq-page.component';
import { OrderTrackingResultComponent } from './public/order-tracking/order-tracking-result/order-tracking-result.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'page/:slug', component: SimplePageComponent },
  { path: 'faq', component: FaqPageComponent },
  { path: 'contact', component: ContactPageComponent},
  { path: 'order-tracking', component: OrderTrackingPageComponent},
  { path: 'order-tracking/detail', component: OrderTrackingResultComponent},
  { path: 'order-tracking/detail/:guest_id/:order_id', component: OrderTrackingResultComponent},
  { path: 'collections', component: CollectionComponent },
  { path: 'collections/:slug', component: CollectionComponent },
  { path: 'products/:slug', component: ProductComponent },
  { path: 'rx-service', component: LenseComponent },
  { path: 'cart', component:  CartComponent},
  {path : 'confirmation', component: ConfirmationComponent},
  {
    path: 'checkout',
    canActivate: [CartEmptyGuard],
    component: CheckoutLayoutComponent,
    children: [
      { path: '', redirectTo: 'guest', pathMatch: 'full' }, // Default route
      { path: 'guest', component: GuestComponent },
      { path: 'prescription', component: PrescriptionComponent },
      { path: 'address', component: AddressComponent },
      { path: 'payment', component: PaymentComponent },
    ]
  },
  // { path: 'checkout', component:  LoginOrGuestComponent, /* canActivate: [CartEmptyGuard] */},
  // { path: 'checkout/guest', component:  GuestComponent, /* canActivate: [CartEmptyGuard] */},
  // { path: 'checkout/address', component:  AddressComponent, /* canActivate: [CartEmptyGuard] */},
  // { path: 'checkout/prescription', component:  PrescriptionComponent, /* canActivate: [CartEmptyGuard] */},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
