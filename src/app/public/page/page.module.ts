import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimplePageComponent } from './simple-page/simple-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';



@NgModule({
  declarations: [
    SimplePageComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PageModule { }
