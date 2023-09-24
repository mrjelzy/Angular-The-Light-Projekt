import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/core/interfaces/Collection';
import { Product } from 'src/app/core/interfaces/Product';
import { CollectionFacadeService } from '../collection-facade.service';
import { Subscription, first, take } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {
  collection !: Collection;
  products !: Product[];

  private collectionSubscription: Subscription | undefined;
  private productsSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute,
              private collectionFacade : CollectionFacadeService,
              private titleService: Title, private metaService: Meta){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if(slug){
        this.collectionFacade.loadCollection(slug);
      }else{
        this.collectionFacade.loadCollection(null);
      }
    });

    this.collectionSubscription = this.collectionFacade.collection$.subscribe(collection => {
      if(collection){
        this.collection = collection;
        this.titleService.setTitle(this.collection.meta_title);
        this.metaService.updateTag({ name: 'description', content: this.collection.meta_description });
        this.metaService.updateTag({ name: 'keywords', content: this.collection.meta_keywords });
        this.metaService.updateTag({name:'robots', content: 'index, follow'});
      }

    });

    this.productsSubscription = this.collectionFacade.products$.subscribe(products => {
      this.products = products;
    });
    
  }  

  ngOnDestroy(){
    this.collectionSubscription?.unsubscribe();
    this.productsSubscription?.unsubscribe();
  }


}
