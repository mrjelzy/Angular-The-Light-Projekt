import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { BlueButtonComponent } from './components/blue-button/blue-button.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [    
    NavbarComponent,
    HeaderComponent,
    MenuComponent,
    BlueButtonComponent,
    ModalComponent,],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent, 
    BlueButtonComponent,
    ModalComponent// Exportez votre composant ici pour qu'il soit utilisable en dehors du module
  ]
})
export class CoreModule { }
