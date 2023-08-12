import { Injectable } from '@angular/core';
import { Product } from '../../core/interfaces/Product';
import { Attribute } from '../../core/interfaces/Attribute';
import { Option } from '../../core/interfaces/Option';
import { Configuration } from '../../core/interfaces/Configuration';
import { BehaviorSubject, Observable, filter, map, take } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { WebContentService } from 'src/app/core/services/web-content.service';
import { Link } from 'src/app/core/interfaces/Link';

@Injectable({
  providedIn: 'root'
})
export class CartFacadeService {

  links$!: Observable<Link[]>;
  pageInfo$!: Observable<any | null>;

  private cartItemsSubject = new BehaviorSubject<Configuration[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private totalPriceSubject = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPriceSubject.asObservable();

  constructor(private webContentService : WebContentService) {
    this.links$ = this.loadLinks();
    this.pageInfo$ = this.loadPageContent();
  }

  setProduct(item: Configuration) {
    this.addCartPrice(item.product.price);
    this.cartItemsSubject.next([...this.cartItemsSubject.value, item]);
    console.log("Produit Simple Ajouté",this.cartItemsSubject.getValue());
  }

  setOptions(product: Configuration, optionsSelected: Option[], attributesSelected : Attribute[], needPrescription : boolean) {
    const updatedItems = this.cartItemsSubject.value.map(item => {
      if (item.id === product.id) {
        return { ...item, attributes: attributesSelected, options: optionsSelected, is_prescription: needPrescription};
      }
      return item;
    });
    this.cartItemsSubject.next(updatedItems);
    let price = 0;
    for(const option of optionsSelected)
      price += option.price;
    this.addCartPrice(price);
    console.log("Ajout des Options",this.cartItemsSubject.getValue());
  }

  loadLastProduct() {
    const items = this.cartItemsSubject.value;
    if (items.length > 0) {
      return items[items.length - 1];
    }
    return null;
  }

  removeFromCartById(itemId: string) {
    const currentCart = this.cartItemsSubject.value;
    const item = currentCart.find(config => config.id === itemId);
    if(item){
      const updatedCart = currentCart.filter(cartItem => cartItem.id !== item.id);
      let price = item.product.price;
      if(item.options){
        for(const option of item.options)
          price += option.price;
      }
      this.deleteCartPrice(price);
      this.cartItemsSubject.next(updatedCart);
      console.log("produit supprimé")
    }else{
      console.log("produit non trouvé dans le panier")
    }
  }

  addCartPrice(newPrice: number) {
    const newTotal = this.totalPriceSubject.value + newPrice;
    this.totalPriceSubject.next(newTotal);
  }

  deleteCartPrice(newPrice: number) {
    const newTotal = this.totalPriceSubject.value - newPrice;
    this.totalPriceSubject.next(newTotal);
  }


  private loadLinks(): Observable<Link[]> {
    return this.webContentService.getMenuLinks().pipe(
      take(1),
      map(result => result.data)
    );
  }

  private loadPageContent(): Observable<any | null> {
    return this.webContentService.getCartPageContent().pipe(
      map(result => result.data[0]),
      take(1)
    );
  }

}
