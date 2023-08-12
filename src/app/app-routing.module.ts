import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './public/collection/collection/collection.component';
import { LenseComponent } from './public/lens/lense/lense.component';
import { ProductComponent } from './public/product/product/product.component';
import { CartComponent } from './public/cart/cart/cart.component';

const routes: Routes = [
  { path: 'collections', component: CollectionComponent },
  { path: 'collections/:slug', component: CollectionComponent },
  { path: 'products/:slug', component: ProductComponent },
  { path: 'rx-service', component: LenseComponent },
  { path: 'cart', component:  CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
