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
        return this.loadSequence(product.product.collection_relation)
      }else { // Redirect to the home page or another desired route
        return of([]); // Return an empty observable in case of no product
      }
    }));

    this.options$ = this.attributes$.pipe(
      take(1),
      switchMap(attributes => {
        if(attributes.length > 0){
          return this.loadOptions(attributes)
        }else{
          return of([]);
        }
      }));
   }

   private loadSequence(productId: number): Observable<Attribute[]> {
    return this.productService.getSequenceByCollectionId(productId).pipe(
      // tap(result => console.log('Sequence data:', result)),
      switchMap(result => {
        const sequence = result.data[0];
        // console.log('Loaded sequence:', sequence);
        if (sequence && sequence.attributes_relation.length > 0) {
          return this.loadAttributes(sequence.attributes_relation);
        }
        console.log('No attributes_relation found.');
        return of([]);
      }),
      take(1)
    );
  }

  private loadAttributes(attributeIds: number[]) {
    const attributesObservables = attributeIds.map(attributeId =>
      this.productService.getSequenceAttribute(attributeId).pipe(
        // tap(sequenceAttribute => console.log(sequenceAttribute)),
        switchMap((sequenceAttribute) => {
          return this.productService.getAttributeById(sequenceAttribute.data.attributes_id).pipe(
            map(result => result.data)
          );
        }),
        take(1)
      )
    );
    return combineLatest(attributesObservables);
  }

  private loadOptions(attributes: Attribute[]): Observable<Option[]> {
    const optionsObservables: Observable<Option>[] = [];
    
    for (const attribute of attributes) {
      for (const optionRelationId of attribute.options_relation) {
        const optionObservable = this.productService.getOptionById(optionRelationId).pipe(
          map(result => result.data),
          take(1)
        );
        optionsObservables.push(optionObservable);
      }
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
