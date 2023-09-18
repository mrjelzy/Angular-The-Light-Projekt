import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
    @Input() pageInfo: any | null;
    @Input() rx !: boolean ;
    @Input() size_eye!: number;
    @Input() size_bridge!: number;
    @Input() size_temple!: number;
    @Input() material!: string;

}
