import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/core/interfaces/Page';
import { PageFacadeService } from '../page-facade.service';
import { first } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-simple-page',
  templateUrl: './simple-page.component.html',
  styleUrls: ['./simple-page.component.css']
})
export class SimplePageComponent {

  data !: Page | null;

  constructor(private route : ActivatedRoute, private pageFacade : PageFacadeService,
              private titleService: Title, private metaService: Meta, private router : Router){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.pageFacade.loadData(slug);
      this.pageFacade.data$.pipe(first()).subscribe(data => {
        this.data = data
        if( this.data == undefined ){
          this.router.navigate(['/not-found'])
        }else{
          this.titleService.setTitle(this.data.meta_title);
          this.metaService.updateTag({ name: 'description', content: this.data.meta_description });
          this.metaService.updateTag( { name: 'keywords', content: this.data.meta_keywords });
          this.metaService.updateTag({name:'robots', content: 'index, follow'});
        }

      });
    });
  }



}
