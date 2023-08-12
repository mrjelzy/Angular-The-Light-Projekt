import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LenseComponent } from './lense/lense.component';
import { LensFacadeService } from './lens-facade.service';



@NgModule({
  declarations: [
    LenseComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[LensFacadeService]
})
export class LensModule { }
