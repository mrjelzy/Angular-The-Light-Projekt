import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection/collection.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { CollectionFacadeService } from './collection-facade.service';



@NgModule({
  declarations: [
    CollectionComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers:[CollectionFacadeService]
})
export class CollectionModule { }
