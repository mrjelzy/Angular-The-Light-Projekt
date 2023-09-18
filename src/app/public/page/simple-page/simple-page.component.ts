import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/core/interfaces/Page';
import { PageFacadeService } from '../page-facade.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-simple-page',
  templateUrl: './simple-page.component.html',
  styleUrls: ['./simple-page.component.css']
})
export class SimplePageComponent {

  data !: Page | null;

  constructor(private route : ActivatedRoute, private pageFacade : PageFacadeService){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.pageFacade.loadData(slug);
      this.pageFacade.data$.pipe(first()).subscribe(data => this.data = data);
    });
  }



}
