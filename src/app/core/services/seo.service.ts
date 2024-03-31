import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title, 
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTags(tags: { name: string; content: string; }[]) {
    tags.forEach(tag => {
      this.meta.updateTag({ name: tag.name, content: tag.content });
    });
  }

  addRobotsMeta(noindex: boolean = false, nofollow: boolean = false) {
    const content = `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`;
    this.meta.updateTag({ name: 'robots', content: content });
  }

  updateOpenGraph(tags: { property: string; content: string; }[]) {
    tags.forEach(tag => {
      this.meta.updateTag({ property: `og:${tag.property}`, content: tag.content });
    });
  }
}
