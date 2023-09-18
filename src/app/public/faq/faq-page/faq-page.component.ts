import { Component } from '@angular/core';
import { FaqFacadeService } from '../faq-facade.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Page } from 'src/app/core/interfaces/Page';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent {

  data !: Page | null;

  constructor(private route : ActivatedRoute, private faqFacade : FaqFacadeService){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.faqFacade.loadData('faq');
      this.faqFacade.data$.pipe(first()).subscribe(data => this.data = data);
    });
  }
}
