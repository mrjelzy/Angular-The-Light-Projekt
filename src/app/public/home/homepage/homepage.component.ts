import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

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

  constructor(private titleService: Title, private metaService: Meta) {
  }

  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({ name: 'description', content: this.description });
    this.metaService.updateTag( { name: 'keywords', content: 'lunettes, vue, optique' });
    this.metaService.updateTag({name:'robots', content: 'index, follow'});
  }

}
