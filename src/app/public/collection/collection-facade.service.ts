import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { CollectionService } from 'src/app/core/services/collection.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Collection } from 'src/app/core/interfaces/Collection';
import { Product } from 'src/app/core/interfaces/Product';

@Injectable()
export class CollectionFacadeService {

  private collectionSubject: BehaviorSubject<Collection | null> = new BehaviorSubject<Collection | null>(null);
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  // Expose les observables pour les composants
  collection$ = this.collectionSubject.asObservable();
  products$ = this.productsSubject.asObservable();

  constructor(private collectionService: CollectionService, 
              private productService : ProductService) { }


  // charge la collection
  loadCollection(slug: string | null) {
    if (slug) {
      this.collectionService.getCollectionBySlug(slug).pipe(take(1)).subscribe(
        (result) => {
          const collection = result.data[0];
          if (collection) {
            this.collectionSubject.next(collection);
            this.loadProducts(collection.id);
          }
        });
    } else {
      this.collectionSubject.next(null); // Pas de collection sélectionnée
      this.loadAllProducts();
    }
  }

  //charge les produits de la collection
  loadProducts(id: number) {
    this.productService.getProductsByCollectionId(id).pipe(take(1)).subscribe(
      (result) => {
        this.productsSubject.next(result.data);
      }
    );
  }

  //charge tous les produits si pas de slug
  loadAllProducts() {
    this.productService.getAllProducts().pipe(take(1)).subscribe(
      (result) => {
        this.productsSubject.next(result.data);
      }
    );
  }


  // Accesseur getter pour la collection
  get currentCollection(): Collection | null {
    return this.collectionSubject.value;
  }

  // Accesseur getter pour la liste actuelle des produits
  get currentProducts(): Product[] {
    return this.productsSubject.value;
  }

}
