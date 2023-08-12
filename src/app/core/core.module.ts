import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { CartPopupComponent } from './components/cart-popup/cart-popup.component';



@NgModule({
  declarations: [    
    NavbarComponent,
    HeaderComponent,
    MenuComponent,
    CartPopupComponent,],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent, // Exportez votre composant ici pour qu'il soit utilisable en dehors du module
  ]
})
export class CoreModule { }
