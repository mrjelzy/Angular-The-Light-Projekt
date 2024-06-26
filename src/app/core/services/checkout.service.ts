import { Injectable } from '@angular/core';
import { Guest } from '../interfaces/Guest';
import { HttpClient } from '@angular/common/http';
import { ConfigurationOption } from '../interfaces/ConfigurationOption';
import { Configuration } from '../interfaces/Configuration';
import { ConfigurationForApi } from '../interfaces/ConfigurationForApi';
import { ConfigurationAttribute } from '../interfaces/ConfigurationAttribute';
import { Cart } from '../interfaces/Cart';
import { CartConfiguration } from '../interfaces/CartConfiguration';
import { Observable, of } from 'rxjs';
import { FileResponse } from '../interfaces/FileResponse';
import { PrescriptionConfiguration } from '../interfaces/PrescriptionConfiguration';
import { Address } from '../interfaces/Address';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiUrl = process.env['API_URI'];

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

  postFile(file : File, folder : string) : Observable<FileResponse>{
    const formData = new FormData();
    formData.append('folder', folder);
    formData.append('file', file);
    const url = `${this.apiUrl}/files`; // Mettez l'URL appropriée pour le téléchargement de fichiers
    return this.http.post<FileResponse>(url, formData);
  }

  postPrescription(data : any){
    const url = `${this.apiUrl}/items/prescriptions`;
    return this.http.post<any>(url, data);
  }

  postPrescriptionConfiguration(relation: PrescriptionConfiguration) {
    const url = `${this.apiUrl}/items/prescriptions_configurations`;
    return this.http.post<any>(url, relation);
  }
  
  postAddress(address : Address){
    const url = `${this.apiUrl}/items/addresses`;
    return this.http.post<any>(url, address);
  }

  patchCart(data : any, id : number){
    const url = `${this.apiUrl}/items/carts/${id}`;
    return this.http.patch<any>(url, data);
  }

  postPaymentIntent(data: any){
    const url  = `${this.apiUrl}/create-payment-intent`;
    return this.http.post<any>(url, data);
  }

  postOrder(order: Order){
    const url = `${this.apiUrl}/items/orders`;
    return this.http.post<any>(url, order);
  }

  getOrderByEmailAndId(email : string | null, id : string | null){
    const url = `${this.apiUrl}/items/orders/?filter[guest][email][_eq]=${email}&filter[id][_eq]=${id}&fields=total, tracking,cart.configurations_relation.configurations_id.*, state.title, guest.first_name, guest.last_name, cart.address.*`;
    return this.http.get<any>(url);
  }

  getOrderByGuestIdAndOrderId(guest_id : string | null, order_id : string | null){
    const url = `${this.apiUrl}/items/orders/?filter[guest][id][_eq]=${guest_id}&filter[id][_eq]=${order_id}&fields=total, tracking,cart.configurations_relation.configurations_id.*, state.title, guest.first_name, guest.last_name, cart.address.*`;
    return this.http.get<any>(url);
  }

  getConfigurationById(id : number){
    const url = `${this.apiUrl}/items/configurations/${id}`;
    return this.http.get<any>(url);
  }

  getOptionbyConfigurationsOptions(id: number){
    const url = `${this.apiUrl}/items/configurations_options/${id}/?fields=options_id.*`;
    return this.http.get<any>(url);
  }  

  getAttributebyConfigurationsAttributes(id: number){
    const url = `${this.apiUrl}/items/configurations_attributes/${id}/?fields=attributes_id.*`;
    return this.http.get<any>(url);
  }  
}
