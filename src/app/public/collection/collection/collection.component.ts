import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/core/interfaces/Collection';
import { Product } from 'src/app/core/interfaces/Product';
import { CollectionFacadeService } from '../collection-facade.service';
import { Subscription, first, take } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';

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
              private seoService : SeoService){}

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
        this.seoService.updateTitle(this.collection.meta_title);
        this.seoService.updateMetaTags([
          { name: 'description', content: this.collection.meta_description },
          { name: 'keywords', content: this.collection.meta_keywords }
        ]);
        this.seoService.addRobotsMeta(false, false);
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
