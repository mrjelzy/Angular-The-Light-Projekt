import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Page } from 'src/app/core/interfaces/Page';
import { WebContentService } from 'src/app/core/services/web-content.service';

@Injectable({
  providedIn: 'root'
})
export class PageFacadeService {

  data$!: Observable<Page>;

  constructor(private webContentService : WebContentService) { }

  loadData(slug: string | null) {
    this.data$ = this.webContentService.getPageBySlug(slug).pipe(
      map(result => result.data[0]),
      take(1)
    );
  }
}
