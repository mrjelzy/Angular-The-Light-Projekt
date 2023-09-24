import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent {
  title = 'Contactez-nous | Service Client | The Light Projekt'
  description = 'Contacter l\'equipe de The Light Projekt pour vos demandes'

  constructor(private titleService: Title, private metaService: Meta) {
  }

  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({ name: 'description', content: this.description });
    this.metaService.updateTag({ name: 'keywords', content: 'contact, service client' });
    this.metaService.updateTag({name:'robots', content: 'index, follow'});
  }

}
