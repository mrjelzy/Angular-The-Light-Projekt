import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, concatMap, forkJoin, from, map, mergeMap, of, switchMap, take, tap, throwError } from 'rxjs';
import { Guest } from 'src/app/core/interfaces/Guest';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { CartFacadeService } from '../cart/cart-facade.service';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { Option } from 'src/app/core/interfaces/Option';
import { ConfigurationOption } from 'src/app/core/interfaces/ConfigurationOption';
import { ConfigurationForApi } from 'src/app/core/interfaces/ConfigurationForApi';
import { Attribute } from 'src/app/core/interfaces/Attribute';
import { Cart } from 'src/app/core/interfaces/Cart';
import { CartConfiguration } from 'src/app/core/interfaces/CartConfiguration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFacadeService {

  configurations$: Observable<Configuration[]>;
  configurationIds : number[] = [];
  guestId !: number;
  cartId !: number;
  total$ !: Observable<number>;
  needPrescription: boolean = false;

  constructor(private checkoutService : CheckoutService,
              private cartFacade : CartFacadeService,
              private router : Router) { 

    this.configurations$ = this.cartFacade.cartItems$;
    this.total$ = this.cartFacade.totalPrice$;

  }

  createGuestAndConfigurationAndCart(firstName: string, lastName: string, email: string, numberPhone: string) {
    console.log("Creating guest...");
    return this.createGuest(firstName, lastName, email, numberPhone).pipe(
      switchMap(guestId => this.configurations$.pipe(
        concatMap(configurations => {
          console.log("Creating configurations...");
          const createConfigurationsObservables = configurations.map(config =>
            this.createConfiguration(config)
          );

          return forkJoin(createConfigurationsObservables).pipe(
            switchMap(createdConfigurationIds => {
              console.log("Configurations created:", createdConfigurationIds);
              const configurationIds = createdConfigurationIds.filter(id => id !== undefined) as number[];
              console.log("Creating cart...");
              return this.createCart(guestId, configurationIds);
            })
          );
        })
      ))
    ).subscribe( () => {
      this.redirectPrescriptionOrAddress();
    });
  }

  private createGuest(firstName: string, lastName: string, email: string, numberPhone: string) : Observable<number> {
    console.log("Creating guest...");

    const guest: Guest = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      number_phone: numberPhone
    };

    return this.checkoutService.postGuest(guest).pipe(
      concatMap(response => {
        console.log("Guest created:", response.data.id);
        return of(response.data.id)
      })
    );
  }

  private createConfiguration(configuration: Configuration): Observable<number> {
    console.log("Creating configuration...");
    let createdConfigurationId: number;

    let _configuration : ConfigurationForApi = {
      product : configuration.product.id,
      is_prescription : configuration.is_prescription,
    }
  
    return this.checkoutService.postConfiguration(_configuration).pipe(
      concatMap(response => {
        createdConfigurationId = response.data.id; // Store the created configuration ID
        console.log("Configuration created:", createdConfigurationId);
  
        // Create and link attributes and options to the configuration
        return this.createAttributesAndOptionsForConfiguration(createdConfigurationId, configuration.attributes, configuration.options);
      }),
      catchError(error => {
        console.error('Error creating configuration:', error);
        return throwError(error);
      }),
      // Return the created configuration ID
      concatMap(() => {
        console.log("Returning configuration ID:", createdConfigurationId);
        return of(createdConfigurationId);
      })
    );
  }
  
  private createAttributesAndOptionsForConfiguration(configurationId: number, attributes: Attribute[] | undefined, options: Option[] | undefined): Observable<any> {
    console.log("Creating attributes and options for configuration...");
    // Create and link attributes and options to the configuration using CheckoutService
    if(!attributes || !options){
      console.log("No attributes or options, returning EMPTY");
      return of(EMPTY);
    }

    const createAttributeObservables = attributes.map(attribute =>
      this.checkoutService.postConfigurationAttribute({
        configurations_id: configurationId,
        attributes_id: attribute.id // Replace with your attribute ID property
      })
    );
  
    const createOptionObservables = options.map(option =>
      this.checkoutService.postConfigurationOption({
        configurations_id: configurationId,
        options_id: option.id // Replace with your option ID property
      })
    );
  
    // Combine attribute and option observables
    const allObservables = [...createAttributeObservables, ...createOptionObservables];
  
    // Use forkJoin to wait for all observables to complete
    return forkJoin(allObservables).pipe(
      catchError(error => {
        console.error('Error creating attributes or options:', error);
        return throwError(error);
      }),
      concatMap(() => {
        console.log("Attributes and options created for configuration:", configurationId);
        return of(configurationId);
      })
    );
  }

  private createCart(guestId : number , configurationIds : number[]){
    console.log("Creating cart...");
    console.log("Guest ID:", guestId);
    console.log("Configuration IDs:", configurationIds);
    console.log("Creating cart...");

    const cart: Cart = {
      guest: guestId,
      state: 0,
      // total : this.total$
    };
  
    return this.checkoutService.postCart(cart).pipe(
      concatMap(cartResponse => {
        const cartId = cartResponse.data.id; // Récupère l'ID du cart créé
        console.log("Cart created:", cartId);
  
        // Crée les relations entre le cart et les configurations
        const createCartConfigurationsObservables = configurationIds.map(configId =>
          this.checkoutService.postCartConfiguration({
            carts_id: cartId,
            configurations_id: configId
          })
        );
  
        return forkJoin(createCartConfigurationsObservables).pipe(
          catchError(error => {
            console.error('Error creating cart configurations:', error);
            return throwError(error);
          }),
          map(() => cartId) // Retourne l'ID du cart
        );
      }),
      catchError(error => {
        console.error('Error creating cart:', error);
        return throwError(error);
      })
    );
  }

  private redirectPrescriptionOrAddress(){
    this.configurations$.pipe(take(1)).subscribe(cart => {
      for(const item of cart){
        if(item.is_prescription)
          this.needPrescription = true;
      }
      if(this.needPrescription){
        this.router.navigate(['/checkout/prescription']).then(() => {
          console.log('Redirection effectuée pour obtenir les prescriptions');
        });
      }else{
        this.router.navigate(['/checkout/address']).then(() => {
          console.log('Redirection effectuée pour obtenir l\'address');
        });
      }
    })
  }
    
}
