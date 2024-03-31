import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  links = [
    {
      title : "Optique",
      route : "/products/kuma-clear"
    },
    {
      title : "Solaire",
      route : "/products/kuma-sun"
    }
  ]

  title = 'The Light Projekt | Lunettes de vue et de soleil'
  description = 'Découvrez des Lunettes de vue et de Soleil Premium. Livraison Gratuite à domicile.'

  constructor(private seoService : SeoService) {
  }

  ngOnInit(){
    this.seoService.updateTitle(this.title);
    this.seoService.updateMetaTags([
      { name: 'description', content: this.description },
      { name: 'keywords', content: 'lunettes, vue, optique' }
    ]);
    this.seoService.addRobotsMeta(false, false);
  }

}
