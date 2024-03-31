import { Component } from '@angular/core';
import { FaqFacadeService } from '../faq-facade.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Page } from 'src/app/core/interfaces/Page';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent {

  data !: Page | null;

  constructor(private route : ActivatedRoute, private faqFacade : FaqFacadeService,
              private seoService :SeoService){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.faqFacade.loadData('faq');
      this.faqFacade.data$.pipe(first()).subscribe(data => {
        this.data = data

        this.seoService.updateTitle(this.data?.meta_title);
        this.seoService.updateMetaTags([
          { name: 'description', content: this.data.meta_description },
          { name: 'keywords', content: this.data.meta_keywords }
        ]);
        this.seoService.addRobotsMeta(false, false);
      });

    });
  }
}
