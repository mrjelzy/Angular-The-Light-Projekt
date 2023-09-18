import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTrackingPageComponent } from './order-tracking-page/order-tracking-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { OrderTrackingResultComponent } from './order-tracking-result/order-tracking-result.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderItemOptionsComponent } from './order-item-options/order-item-options.component';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OrderTrackingPageComponent,
    OrderTrackingResultComponent,
    OrderItemComponent,
    OrderItemOptionsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class OrderTrackingModule { }
