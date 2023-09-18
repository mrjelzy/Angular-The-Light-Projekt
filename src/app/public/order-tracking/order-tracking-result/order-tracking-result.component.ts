import { Component } from '@angular/core';
import { OrderResponse } from 'src/app/core/interfaces/OrderResponse';
import { OrderTrackingFacadeService } from '../order-tracking-facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Configuration } from 'src/app/core/interfaces/Configuration';

@Component({
  selector: 'app-order-tracking-result',
  templateUrl: './order-tracking-result.component.html',
  styleUrls: ['./order-tracking-result.component.css']
})
export class OrderTrackingResultComponent {
  data !: OrderResponse | null;
  products !: Configuration[];

  steps: any[] = [];
  

  constructor(private route : ActivatedRoute, private orderTrackingFacade : OrderTrackingFacadeService, private router : Router){
    this.steps = [
          { label: 'Paid', text: 'Payé'},
          { label: 'In process', text: 'En cours de traitement'},
          { label: 'Dispatched', text: 'Expedié'},
          { label: 'Delivered', text: 'Livré' }
        ]
  }

  ngOnInit(){
    let guestId !: string | null;
    let orderId !: string | null ;
    this.route.paramMap.subscribe(params => {
      guestId = params.get('guest_id');
      orderId = params.get('order_id');
      if(guestId && orderId){
        this.orderTrackingFacade.loadDataByGuestIdAndOrderId(guestId, orderId);
      }
    });

    if(!this.orderTrackingFacade.checkDataIsNotUndefined() && (!guestId || !orderId)){
      this.router.navigate(['/'])
    }else{
      this.orderTrackingFacade.data$.pipe(first()).subscribe(data => {
        this.data = data
      });
  
      this.orderTrackingFacade.getProducts().pipe(first()).subscribe(data => {
        this.products = data
        // console.log(this.products)
      });
    }

  }

  checkIfShipped(){
    return this.data?.state.title == 'Dispatched' || this.data?.state.title == 'Delivered'
  }

  getEtat(){
    let text : string = "Inconnu";
    for(const step of this.steps){
      if(step.label == this.data?.state.title)
        text = step.text;
    }
    return text;
  }

  onSubmit(){
    const url = "https://dashboard.myflyingbox.com/fr/tracking/" + this.data?.tracking;
    window.open(url, '_blank');
  }

  getIndexStep() {
    return this.steps.findIndex(step => step.label == this.data?.state.title);
  }

}
