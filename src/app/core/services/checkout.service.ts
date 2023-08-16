import { Injectable } from '@angular/core';
import { Guest } from '../interfaces/Guest';
import { HttpClient } from '@angular/common/http';
import { ConfigurationOption } from '../interfaces/ConfigurationOption';
import { Configuration } from '../interfaces/Configuration';
import { ConfigurationForApi } from '../interfaces/ConfigurationForApi';
import { ConfigurationAttribute } from '../interfaces/ConfigurationAttribute';
import { Cart } from '../interfaces/Cart';
import { CartConfiguration } from '../interfaces/CartConfiguration';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiUrl = 'https://directus.thelightprojekt.com';

  constructor(private http: HttpClient) { }

  postGuest(guest : Guest) : Observable<any>{
    const url = `${this.apiUrl}/items/guests`;
    return this.http.post<Guest>(url, guest);
  }
  
  postConfigurationOption(relation : ConfigurationOption){
    const url = `${this.apiUrl}/items/configurations_options`;
    return this.http.post<any>(url, relation);
  }

  postConfigurationAttribute(relation : ConfigurationAttribute){
    const url = `${this.apiUrl}/items/configurations_attributes`;
    return this.http.post<any>(url, relation);
  }

  postConfiguration(configuration : ConfigurationForApi){
    const url = `${this.apiUrl}/items/configurations`;
    return this.http.post<any>(url, configuration);
  }

  postCart(cart : Cart){
    const url = `${this.apiUrl}/items/carts`;
    return this.http.post<any>(url, cart);
  }

  postCartConfiguration(relation : CartConfiguration){
    const url = `${this.apiUrl}/items/carts_configurations`;
    return this.http.post<any>(url, relation);
  }

  // patchConfiguration(configuration : ConfigurationForApi, id: string | undefined){
  //   const url = `${this.apiUrl}/items/configurations/${id}`;
  //   return this.http.patch<any>(url, configuration);
  // }


}
