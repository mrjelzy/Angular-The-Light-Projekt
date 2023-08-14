import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LenseComponent } from './lense/lense.component';
import { LensFacadeService } from './lens-facade.service';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    LenseComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  providers:[LensFacadeService]
})
export class LensModule { }
