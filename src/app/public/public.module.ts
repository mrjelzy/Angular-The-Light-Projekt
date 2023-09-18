import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ProductModule } from './product/product.module';
import { CollectionModule } from './collection/collection.module';
import { CartModule } from './cart/cart.module';
import { LensModule } from './lens/lens.module';
import { CheckoutModule } from './checkout/checkout.module';
import { ContactModule } from './contact/contact.module';
import { OrderTrackingModule } from './order-tracking/order-tracking.module';
import { PageModule } from './page/page.module';
import { FaqModule } from './faq/faq.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    ProductModule,
    CollectionModule,
    CartModule,
    LensModule,
    CheckoutModule,
    ContactModule,
    OrderTrackingModule,
    PageModule,
    FaqModule,
  ]
})
export class PublicModule { }
