import { Injectable } from '@angular/core';
import { Observable, combineLatest, concatMap, map, of, switchMap, take } from 'rxjs';
import { CartFacadeService } from 'src/app/public/cart/cart-facade.service';
import { Collection } from 'src/app/core/interfaces/Collection';
import { Product } from 'src/app/core/interfaces/Product';
import { Image } from 'src/app/core/interfaces/Image';
import { ProductImage } from 'src/app/core/interfaces/ProductImage';
import { CollectionService } from 'src/app/core/services/collection.service';
import { ProductService } from 'src/app/core/services/product.service';
import { WebContentService } from 'src/app/core/services/web-content.service';
import { Router } from '@angular/router';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductFacadeService {

  product$!: Observable<Product>;
  images$!: Observable<Image[]>;
  collection$!: Observable<Collection | null>;
  pageInfo$!: Observable<any | null>;

  constructor(private webContentService : WebContentService,
              private collectionService : CollectionService,
              private productService : ProductService,
              private cartFacade : CartFacadeService,
              private router : Router) {
              
    }

    loadProduct(slug: string | null) {
      this.product$ = this.productService.getProductBySlug(slug).pipe(
        map(result => result.data[0]),
        take(1)
      );

      this.collection$ = this.product$.pipe(switchMap(product => this.loadCollection(product.collection_relation)), take(1));

      this.pageInfo$ = this.loadPageContent();
      
      this.images$ = this.product$.pipe(
        switchMap(product => {
          if (product) {
            return this.loadThumbnail(product.thumbnail).pipe(
              switchMap(thumbnail => {
                return this.loadImages(product.id).pipe(
                  map(images => [thumbnail, ...images]), take(1) // Ajouter la thumbnail au début du tableau
                );
              }), take(1)
            );
          } else {
            return of([]); // Pas de produit, pas d'images
          }
        }), take(1)
      );

    }

    private loadThumbnail(thumbnailId: string): Observable<Image> {
      return this.webContentService.getFileById(thumbnailId).pipe(
        map(result => result.data),
        take(1)
      );
    }
  
    private loadImages(productId: number | null): Observable<Image[]> {
      if (!productId) {
        return of([]);
      }
      return this.webContentService.getImagesByProductId(productId).pipe(
        switchMap(result => {
          const productImageRelation = result.data;
          if (productImageRelation.length > 0) {
            return this.loadSingleImages(productImageRelation);
          }
          return of([]);
        }), take(1)
      );
    }
  
    private loadSingleImages(productImageRelation: ProductImage[]): Observable<Image[]> {
      const imageObservables = productImageRelation.map(item =>
        this.webContentService.getFileById(item.directus_files_id).pipe(
          map(result => result.data), 
          take(1)
        )
      );
      return combineLatest(imageObservables);
    }
  
    private loadCollection(productId: number | null): Observable<Collection | null> {
      if (!productId) {
        return of(null);
      }
      return this.collectionService.getCollectionById(productId).pipe(
        map(result => result.data),
        take(1)
      );
    }
  
    private loadPageContent(): Observable<any | null> {
      return this.webContentService.getPageProductContent().pipe(
        map(result => result.data[0]),
        take(1)
      );
    }


    onClickAddToCart(){
      this.product$.pipe(take(1)).subscribe(product => {
        const uniqueId = uuidv4();
        const newItem: Configuration = {
          id: uniqueId,
          product: product,
        };
        this.cartFacade.setProduct(newItem);

        if(product.rx){
          this.router.navigate(['/rx-service']);
        }else{
          this.router.navigate(['/cart']);
      }});
  

    }


}


