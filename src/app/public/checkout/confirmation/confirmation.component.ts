import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/interfaces/Order';
import { CheckoutFacadeService } from '../checkout-facade.service';
import { take } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  title = "The Light Projekt | Confirmation Commande"

  constructor(private titleService: Title,  
    private metaTagService: Meta ){
  }

  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({name:'robots', content: 'noindex, nofollow'})
  }
}
