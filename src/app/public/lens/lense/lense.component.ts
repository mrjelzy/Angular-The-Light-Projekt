import { Component } from '@angular/core';
import { Attribute } from 'src/app/core/interfaces/Attribute';
import { Option } from 'src/app/core/interfaces/Option';
import { Product } from 'src/app/core/interfaces/Product';
import { NavigationStart, Router } from '@angular/router';
import { LensFacadeService } from '../lens-facade.service';
import { Subscription, SubscriptionLike, first } from 'rxjs';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { Meta, Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-lense',
  templateUrl: './lense.component.html',
  styleUrls: ['./lense.component.css']
})
export class LenseComponent {
  loading: boolean = false;

  frame !: Configuration | null; // Monture chargée
  attributes : Attribute[] = []; // Liste des attributs
  options : Option[] = []; // Liste des options
  currentStep: number = 0; // L'étape actuelle de sélection d'options

  optionsSelected : Option[] = [];
  needPrescription : boolean = false;

  price !: number;

  pageInfo !: any | null;

  private locationSubscription: Subscription | undefined; // Pour stocker la souscription
  private locationSubscriptionLike : SubscriptionLike | undefined;

  title = "The Light Projekt | Verres"

  constructor(private lensFacade : LensFacadeService, private router: Router,
    private seoService: SeoService, private location : Location) {}

  ngOnInit(){
    this.locationSubscriptionLike  = this.location.subscribe((event) => {
      if(event.type == "popstate"  && event.url == `/products/${this.frame?.product.slug}` && this.frame)
          this.lensFacade.closeLensSelector(this.frame);
    });
    this.locationSubscription = this.locationSubscriptionLike as Subscription;

    this.loading = true;

    this.lensFacade.product$.pipe(first()).subscribe(
      frame => {
      if(frame == null){
        this.router.navigate(['/']);
      }
      this.frame = frame;
      this.price = frame ? frame.product.price : 0;
      });

      this.lensFacade.attributes$.pipe(first()).subscribe(attributes => {
        this.attributes = attributes
        this.attributes.sort((a, b) => a.weight - b.weight);
      })
  
      this.lensFacade.options$.pipe(first()).subscribe(options => {
        this.options = options;
        this.options.sort((a, b) => a.id - b.id);
        this.loading = false;
      })

      this.seoService.updateTitle(this.title);
      this.seoService.addRobotsMeta(true, true);
  
  }

  ngOnDestroy(){
    this.locationSubscription?.unsubscribe();
  }

  isOptionAvailable(optionId: number): boolean {
    return this.options.some(option => option.id === optionId);
  }
  
  getOptionTitle(optionId: number): string {
    const option = this.options.find((opt) => opt.id === optionId);
    return option ? option.title : 'Option non trouvée';
  }

  getOptionPrice(optionId: number): number {
    const option = this.options.find((opt) => opt.id === optionId);
    return option ? option.price : 0;
  }
  
  getOptionDescription(optionId: number): string {
    const option = this.options.find((opt) => opt.id === optionId);
    return option ? option.description : '';
  }

  nextStep(optionId : number) {

    if(this.needPrescription === false && this.attributes[this.currentStep+1].slug === 'thinning'){
      const thinningIndex = this.attributes.findIndex(attr => attr.slug === 'thinning');
      if (thinningIndex !== -1) {
        this.attributes.splice(thinningIndex, 1);
      }
    }

    if(this.currentStep < this.attributes.length) {
      this.currentStep++;
      const option = this.options.find((opt) => opt.id === optionId);
      if(option){
        if(option.slug === 'prescription'){
          this.needPrescription = true;
        }
        this.optionsSelected.push(option);
        this.price += option?.price
      }
    }
  }

  addToCart(){
    if(this.frame){
      this.lensFacade.addToCart(this.frame, this.optionsSelected, this.attributes, this.needPrescription);
      this.router.navigate(['/cart']);
    }
  }

  close(){
    if(this.frame){
      this.lensFacade.closeLensSelector(this.frame);
      this.router.navigate(['/products', this.frame.product.slug]);
    }
  }

}
