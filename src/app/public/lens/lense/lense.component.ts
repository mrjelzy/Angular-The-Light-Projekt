import { Component } from '@angular/core';
import { Attribute } from 'src/app/core/interfaces/Attribute';
import { Option } from 'src/app/core/interfaces/Option';
import { Product } from 'src/app/core/interfaces/Product';
import { Router } from '@angular/router';
import { LensFacadeService } from '../lens-facade.service';
import { first } from 'rxjs';
import { Configuration } from 'src/app/core/interfaces/Configuration';

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

  constructor(private lensFacade : LensFacadeService, private router: Router){
  }

  ngOnInit(){
    this.loading = true;

    this.lensFacade.product$.subscribe(
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
