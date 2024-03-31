import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent {
  title = 'Contactez-nous | Service Client | The Light Projekt'
  description = 'Contacter l\'equipe de The Light Projekt pour vos demandes'

  constructor(private seoService: SeoService) {
  }

  ngOnInit(){
    this.seoService.updateTitle(this.title);
    this.seoService.updateMetaTags([
      { name: 'description', content: this.description },
      { name: 'keywords', content: 'contact, service client' }
    ])
    this.seoService.addRobotsMeta(false, false);

  }

}
