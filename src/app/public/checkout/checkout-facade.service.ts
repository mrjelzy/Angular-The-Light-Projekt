import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, combineLatest, concatMap, distinctUntilChanged, forkJoin, from, map, mergeMap, of, switchMap, take, tap, throwError } from 'rxjs';
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
import { PrescriptionConfiguration } from 'src/app/core/interfaces/PrescriptionConfiguration';
import { Address } from 'src/app/core/interfaces/Address';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFacadeService {

  configurations$: Observable<Configuration[]>;
  configurationIds : number[] = [];
  guestId !: number;
  cartId !: number;
  total$ !: Observable<number>;

  private secretTokenIntent = new BehaviorSubject<string>("");
  secretTokenIntent$ = this.secretTokenIntent.asObservable();

  // private wantToModifyGuestSubject = new BehaviorSubject<boolean>(false);
  // wantToModifyGuestSubject$ = this.wantToModifyGuestSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loadingSubject$ = this.loadingSubject.asObservable();

  private _address !: Address;

  public getAdress(){
    return this._address;
  }

  public setAdress(value : Address){
    this._address = value;
  }

  private _guest !: Guest;

  public getGuest(): Guest {
    return this._guest;
  }
  public setGuest(value: Guest) {
    this._guest = value;
  }
  
  constructor(private checkoutService : CheckoutService,
              private cartFacade : CartFacadeService) { 

    this.configurations$ = this.cartFacade.cartItems$;
    this.total$ = this.cartFacade.totalPrice$;
  }

  createGuestAndConfigurationAndCart() {
    console.log("Creating guest...");
    return this.createGuest().pipe(
      switchMap(guestId => this.configurations$.pipe(
        take(1),
        concatMap(configurations => {

          if (configurations.length === 0) {
            console.log("No configurations found. Skipping creation.");
            // Rediriger ici vers la page appropriée
            return EMPTY; // Ne rien faire si pas de configurations
          }

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
    ).subscribe( () =>  this.setLoading(false));
  }

  private createGuest() : Observable<number> {
    console.log("Creating guest...");

    if(this._guest && this._guest.id){
      return of(this._guest.id);
    }
    else{
      return this.checkoutService.postGuest(this._guest).pipe(
        concatMap(response => {
          this._guest = response.data;
          console.log("Guest created:", response.data.id);
          return of(response.data.id)
        }));
    }

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
        createdConfigurationId = response.data.id; 
        configuration.directusId = response.data.id;// Store the created configuration ID
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

    if (configurationIds.length === 0) {
      console.log("No configurations found. Skipping cart creation.");
      return EMPTY; // Ne rien faire si pas de configurations
    }
    console.log("Creating cart...");


    const cart: Cart = {
      guest: guestId,
      state: 0,
      total : this.getTotal()
    };
  
    return this.checkoutService.postCart(cart).pipe(
      concatMap(cartResponse => {
        const cartId = cartResponse.data.id; // Récupère l'ID du cart créé
        console.log("Cart created:", cartId);
        this.cartId = cartId;
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

  checkIfPrescriptionNeeded(): boolean {
    const cartItems = this.cartFacade.getCartItems();
    return cartItems.some(item => item.is_prescription);
  }

  getTotal(){
    let totalPrice = 0;
    this.total$.pipe(take(1)).subscribe(total => totalPrice = total);
    return totalPrice;
  }
  
  // setWantToModify(value : boolean){
  //   this.wantToModifyGuestSubject.next(value);
  // }

  setLoading(value : boolean){
    this.loadingSubject.next(value);
  }


  ////// Prescription /////

  private selectedFilesSubject: BehaviorSubject<{ [itemId: number]: File | null }> = new BehaviorSubject({});
  private itemFileSelectionsSubject: BehaviorSubject<{ [itemId: number]: boolean }> = new BehaviorSubject({});
  private itemSendPrescriptionLaterSubject: BehaviorSubject<{ [itemId: number]: boolean }> = new BehaviorSubject({});

  selectedFiles$: Observable<{ [itemId: number]: File | null }> = this.selectedFilesSubject.asObservable();
  itemFileSelections$: Observable<{ [itemId: number]: boolean }> = this.itemFileSelectionsSubject.asObservable();
  itemSendPrescriptionLater$: Observable<{ [itemId: number]: boolean }> = this.itemSendPrescriptionLaterSubject.asObservable();


  updateSelectedFiles(itemId: number, file: File | null) {
    const updatedSelectedFiles = { ...this.selectedFilesSubject.getValue(), [itemId]: file };
    this.selectedFilesSubject.next(updatedSelectedFiles);
  }

  updateItemFileSelections(itemId: number, isSelected: boolean) {
    const updatedItemFileSelections = { ...this.itemFileSelectionsSubject.getValue(), [itemId]: isSelected };
    this.itemFileSelectionsSubject.next(updatedItemFileSelections);
  }

  updateItemSendPrescriptionLater(itemId: number, isSelected: boolean) {
    const updatedItemSendPrescriptionLater = { ...this.itemSendPrescriptionLaterSubject.getValue(), [itemId]: isSelected };
    this.itemSendPrescriptionLaterSubject.next(updatedItemSendPrescriptionLater);
  }

  handleOptionChange(event: any, option: 'file' | 'later', itemId: number): void {
    if (option === 'file') {
      this.updateSelectedFiles(itemId, event.target.files[0]);
      this.updateItemFileSelections(itemId, true);
      this.updateItemSendPrescriptionLater(itemId, false);
    } else if (option === 'later') {
      this.updateItemFileSelections(itemId, false);
      this.updateSelectedFiles(itemId, null);
      this.updateItemSendPrescriptionLater(itemId, true);
    }
  }
  
  canContinue(): Observable<boolean> {
    return combineLatest([
      this.configurations$,
      this.selectedFiles$,
      this.itemSendPrescriptionLater$
    ]).pipe(
      map(([cart, selectedFiles, itemSendPrescriptionLater]) => {
        return cart.every(item => {
          if (item.directusId && item.is_prescription) {
            return selectedFiles[item.directusId] || itemSendPrescriptionLater[item.directusId];
          }
          return true;
        });
      })
    );
  }

  getItemsWithFiles() {
    return this.selectedFiles$.pipe(
      map(selectedFiles => {
        const itemsWithFiles: number[] = [];
        for (const itemId in selectedFiles) {
          if (selectedFiles[itemId]) {
            itemsWithFiles.push(parseInt(itemId));
          }
        }
        return itemsWithFiles;
      })
    ); 
  }

  getItemsWithLaterOption(): Observable<number[]> {
    return this.itemSendPrescriptionLater$.pipe(
      map(itemSendPrescriptionLater => {
        const itemsWithLaterOption: number[] = [];
        for (const itemId in itemSendPrescriptionLater) {
          if (itemSendPrescriptionLater[itemId]) {
            itemsWithLaterOption.push(parseInt(itemId));
          }
        }
        return itemsWithLaterOption;
      })
    );
  }

  handleContinueClick(): void {
    const configurationsWithFiles: { itemId: number, file: File | null }[] = [];
  
    this.configurations$.pipe(take(1)).subscribe(cart => {
      cart.forEach(item => {
        if(item.directusId){
          if (this.selectedFilesSubject.getValue()[item.directusId] || this.itemSendPrescriptionLaterSubject.getValue()[item.directusId]) {
            if (this.selectedFilesSubject.getValue()[item.directusId]) {
              configurationsWithFiles.push({ itemId: item.directusId, file: this.selectedFilesSubject.getValue()[item.directusId] });
            } else {
              configurationsWithFiles.push({ itemId: item.directusId, file: null });
            }
          }
        }
      });
  
      if (configurationsWithFiles.length > 0) {
        this.uploadFilesAndCreatePrescriptions(configurationsWithFiles);
      } else {
        // Aucun fichier ou option "later" sélectionné, vous pouvez définir ici un comportement en conséquence
        console.log("Aucun fichier ou option 'later' sélectionné.");
      }
    });
  }
  
  uploadFilesAndCreatePrescriptions(configurationsWithFiles: { itemId: number, file: File | null }[]): void {
    const uploadObservables = configurationsWithFiles.map(item => {
      if (item.file) {
        const folder = '4b0a87ce-4402-43eb-9d1f-e64d4408e888'; // Remplacez par le nom de votre dossier sur le serveur
        return this.checkoutService.postFile(item.file, folder).pipe(
          switchMap(fileResponse => {
            console.log(fileResponse)
            const prescriptionData = {
              guest: this._guest.id, // Récupérez l'ID du guest
              prescription_file: fileResponse.data.id,
              send_prescription_later: false // Par défaut, le boolean est false
            };
            console.log("File Prescription", prescriptionData)
            if (this.itemSendPrescriptionLaterSubject.getValue()[item.itemId]) {
              prescriptionData.send_prescription_later = true;
            }
  
            return this.checkoutService.postPrescription(prescriptionData).pipe(
              switchMap(prescriptionResponse => {
                const relation: PrescriptionConfiguration = {
                  prescriptions_id: prescriptionResponse.data.id,
                  configurations_id: item.itemId
                };
                return this.checkoutService.postPrescriptionConfiguration(relation);
              })
            );
          })
        );
      } else {
        // Aucun fichier, créer la prescription avec l'option "later"
        const prescriptionData = {
          guest: this._guest.id, // Récupérez l'ID du guest
          send_prescription_later: true
        };
        console.log("Later Prescription", prescriptionData)
        return this.checkoutService.postPrescription(prescriptionData).pipe(
          switchMap(prescriptionResponse => {
            const relation: PrescriptionConfiguration = {
              prescriptions_id: prescriptionResponse.data.id,
              configurations_id: item.itemId
            };
            return this.checkoutService.postPrescriptionConfiguration(relation);
          })
        );
        }
    });
  
    forkJoin(uploadObservables).subscribe(
      () => {
        console.log("Fichiers envoyés et prescriptions créées avec succès.");
        // Continuer avec le reste du processus de commande
          this.setLoading(false);
      },
      error => {
        console.error("Erreur lors de l'envoi des fichiers ou de la création des prescriptions:", error);
      }
    );
  }
  
  createAddress(address : Address){
    console.log(this.cartId, this._guest.id);
    if (!this.cartId || !this._guest.id) {
      console.error("L'adresse ou l'ID du panier est manquant. Impossible de créer l'adresse.");
      return;
    }
    address.guest = this._guest.id;
    // this.postAddressAndPatchCart(address).subscribe(
    //   (addressId) => {
    //       console.log(`Adresse créée avec l'ID ${addressId}`);
    //       // Naviguer vers l'étape suivante
    //     this.setLoading(false);
    //   },
    //   (error) => {
    //       console.error("Erreur lors de la création de l'adresse:", error);
    //   }
    // );
      this.postAddressAndPatchCart(address).pipe(
        switchMap(() => {
          console.log(`Adresse créée et panier mis à jour.`);

          const data = {
            amount : this.getTotal()*100
          }
          console.log(data);
          // Maintenant, appelez la méthode createPaymentIntent
          this.createPaymentIntent(data);
          // Return EMPTY pour ne pas propager de valeur à l'observable externe
          return EMPTY;
        }),
        catchError(error => {
          console.error("Erreur lors de la création de l'adresse ou de la mise à jour du panier:", error);
          this.setLoading(false);
          return EMPTY;
        })
      ).subscribe();
  }

  postAddressAndPatchCart(address : Address): Observable<number> {
    return this.checkoutService.postAddress(address).pipe(
        switchMap(addressResponse => {
            // Récupérer l'ID de l'adresse créé
            this._address = addressResponse.data;
            const addressId = addressResponse.data.id;
            // Mettre à jour l'ID de l'adresse dans le panier
            if (this.cartId) {
                const updatedCartData = {
                    address: addressId
                };
                return this.checkoutService.patchCart(updatedCartData, this.cartId).pipe(
                    map(() => addressId)
                );
            } else {
                throw new Error("Impossible de mettre à jour le panier car il n'y a pas de panier ou d'ID de panier.");
            }
        })
    );
  }


  // Payment 

  createPaymentIntent(data : any){
    this.checkoutService.postPaymentIntent(data).pipe(take(1)).subscribe(pi => {
      if(pi){
        this.secretTokenIntent.next(pi.clientSecret);
        this.setLoading(false);
      }
    })
  }




  
}
