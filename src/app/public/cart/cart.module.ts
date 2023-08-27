import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartItemOptionsComponent } from './cart-item-options/cart-item-options.component';
import { RouterModule } from '@angular/router';
import { CartSubtotalComponent } from './cart-subtotal/cart-subtotal.component';
import { CoreModule } from "../../core/core.module";


@NgModule({
    declarations: [
        CartComponent,
        CartItemComponent,
        CartItemOptionsComponent,
        CartSubtotalComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        CoreModule
    ]
})
export class CartModule { }
