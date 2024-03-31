import { Injectable } from '@angular/core';
import { Observable, combineLatest, filter, map, of, switchMap, take, tap } from 'rxjs';
import { CartFacadeService } from 'src/app/public/cart/cart-facade.service';
import { Attribute } from 'src/app/core/interfaces/Attribute';
import { Option } from 'src/app/core/interfaces/Option';
import { Product } from 'src/app/core/interfaces/Product';
import { ProductService } from 'src/app/core/services/product.service';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { WebContentService } from 'src/app/core/services/web-content.service';

@Injectable()
export class LensFacadeService {

  product$ !: Observable<Configuration | null>;
  attributes$ !: Observable<Attribute[]>;
  options$ !: Observable<Option[]>;

  constructor(private cartFacade : CartFacadeService,
              private productService : ProductService,
              private webContentService : WebContentService) {
    this.product$ = this.cartFacade.cartItems$.pipe( // Filter out undefined and empty cart
      map(cart => cart.length > 0 ? cart[cart.length - 1] : null), // Filter out undefined products
      take(1)
    );

    this.attributes$ = this.product$.pipe(
      take(1),
      switchMap(product => {
      if(product){
        return this.loadAttributes(product.product)
      }else { // Redirect to the home page or another desired route
        return of([]); // Return an empty observable in case of no product
      }
    }));

    this.options$ = this.product$.pipe(
      switchMap(product => 
        this.attributes$.pipe(
          take(1),
          switchMap(attributes => {
            if (attributes.length > 0 && product) {
              // Maintenant, on passe product à loadOptions
              return this.loadOptions(attributes, product.product);
            } else {
              // Aucun attribut ou produit trouvé, on retourne un tableau vide
              return of([]);
            }
          })
        )
      )
    );
   }


  private loadAttributes(product: Product): Observable<Attribute[]> {
  const attributesObservables: Observable<Attribute>[] = [];

  for (const attributeRelationId of product.attributes_relation) {
    const attributeObservable = this.productService.getProductAttribute(attributeRelationId).pipe(
      switchMap(result => {
        return this.productService.getAttributeById(result.data.attributes_id).pipe(
          map(details => details.data)
        );
      }),
      take(1)
    );
    attributesObservables.push(attributeObservable);
  }

  return combineLatest(attributesObservables);
}
  

  private loadOptions(attributes: Attribute[], product: Product): Observable<Option[]> {
    const optionsObservables: Observable<Option>[] = [];

    for (const optionRelationId of product.options_relation) {
      const optionObservable = this.productService.getProductOption(optionRelationId).pipe(
        switchMap(result => {
          return this.productService.getOptionById(result.data.options_id).pipe(
            map(details => details.data)
          );
        }),
        take(1)
      );
      optionsObservables.push(optionObservable);
    }
  
    return combineLatest(optionsObservables);
  }

  addToCart(frame : Configuration, optionsSelected : Option[], attributes : Attribute[], needPrescription : boolean){
    this.cartFacade.setOptions(frame , optionsSelected, attributes, needPrescription);
  }

  closeLensSelector(frame : Configuration){
    this.cartFacade.removeFromCartById(frame.id);
  }

}
