import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule } from '@angular/router';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { ProductFacadeService } from './product-facade.service';



@NgModule({
  declarations: [
    ProductComponent,    
    ProductDetailComponent,
    AddToCartComponent,
    ProductSliderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ], 
  providers:[ProductFacadeService]
})
export class ProductModule { }
