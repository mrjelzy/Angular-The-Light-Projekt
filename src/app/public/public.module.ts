import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ProductModule } from './product/product.module';
import { CollectionModule } from './collection/collection.module';
import { CartModule } from './cart/cart.module';
import { LensModule } from './lens/lens.module';
import { CheckoutModule } from './checkout/checkout.module';



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
  ]
})
export class PublicModule { }