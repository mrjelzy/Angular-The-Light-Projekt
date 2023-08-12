import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection } from 'src/app/core/interfaces/Collection';
import { Product } from 'src/app/core/interfaces/Product';
import { Image } from 'src/app/core/interfaces/Image';
import { ProductImage } from 'src/app/core/interfaces/ProductImage';
import { WebContentService } from 'src/app/core/services/web-content.service';
import { ProductService } from 'src/app/core/services/product.service';
import { CollectionService } from 'src/app/core/services/collection.service';
import { CartFacadeService } from 'src/app/public/cart/cart-facade.service';
import { ProductFacadeService } from '../product-facade.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product !: Product | null;
  images : Image[] = [];
  productImageRelation : ProductImage[] = [];
  thumbnail !: Image;

  collection !: Collection | null;
  pageInfo !: any | null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productFacade : ProductFacadeService){}


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.productFacade.loadProduct(slug);
      });

    this.productFacade.product$.pipe(first()).subscribe(product => this.product = product);
    this.productFacade.collection$.pipe(first()).subscribe(collection => this.collection = collection);
    this.productFacade.images$.pipe(first()).subscribe(images =>{
      this.images = images
    } );
    this.productFacade.pageInfo$.pipe(first()).subscribe(pageInfo => this.pageInfo = pageInfo);
  }


  getAddToCartText(){
    let title: string;
    this.product?.rx ? title = this.pageInfo?.add_to_cart_rx : title = this.pageInfo?.add_to_cart_simple;
    return title;
  }
  
  onClickAddToCart(){
      this.productFacade.onClickAddToCart();
  }
}
