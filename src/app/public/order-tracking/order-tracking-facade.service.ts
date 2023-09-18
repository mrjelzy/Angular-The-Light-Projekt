import { Injectable } from '@angular/core';
import { response } from 'express';
import { config } from 'process';
import { Observable, map, switchMap, take, from, of, forkJoin, mergeAll, combineLatest, tap, catchError, throwError } from 'rxjs';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { OrderResponse } from 'src/app/core/interfaces/OrderResponse';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { ProductService } from 'src/app/core/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderTrackingFacadeService {

  data$ !: Observable<OrderResponse> ;

  constructor(private checkoutService : CheckoutService, private productService : ProductService) { }

  loadData(email: string | null, id : string | null) {
    this.data$ = this.checkoutService.getOrderByEmailAndId(email, id).pipe(
      map(result => result.data[0]),
      take(1)
    );
  }

  loadDataByGuestIdAndOrderId(guest_id: string | null, order_id : string | null) {
    this.data$ = this.checkoutService.getOrderByGuestIdAndOrderId(guest_id, order_id).pipe(
      map(result => result.data[0]),
      take(1)
    );
  }

  getProducts(): Observable<any[]> {
    return this.data$.pipe(
      take(1),
      switchMap(order => {
        const configurationObservables = order.cart.configurations_relation.map(config => {

          const product = this.productService.getProductById(config.configurations_id.product)
          .pipe(
            map(result => result.data[0]),
            // tap(result => console.log(result))
          );

          const optionObservables = config.configurations_id.options_relation.map(opt =>
            this.checkoutService.getOptionbyConfigurationsOptions(opt)
            .pipe(
              // tap(response => console.log(response)),
              map(result => result.data.options_id),
            )
          );

          const attributeObservables = config.configurations_id.attributes_relation.map(attr =>
            this.checkoutService.getAttributebyConfigurationsAttributes(attr)
            .pipe(
              // tap(response => console.log(response)),
              map(result => result.data.attributes_id)
            )
          );

          // Utilisez forkJoin pour attendre que toutes les options soient récupérées
          return forkJoin([product, ...optionObservables, ...attributeObservables]).pipe(
            map(result => ({
              id: config.configurations_id.id,
              product: result[0],
              options: result.slice(1, optionObservables.length + 1).sort((a, b) => a.id - b.id), // Exclure le produit de la liste des options
              attributes: result.slice(optionObservables.length + 1).sort((a, b) => a.id - b.id),
              is_prescription: config.configurations_id.is_prescription,
            })),
            // tap( data => console.log(data))
          );
        });
  
        // Utilisez forkJoin pour attendre que toutes les configurations soient récupérées
        return forkJoin(configurationObservables);
      })
    );
  }

  checkDataIsNotUndefined(){
    return this.data$ !== undefined;
  }
  
  

}
