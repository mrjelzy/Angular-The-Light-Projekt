import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://directus.thelightprojekt.com';

  constructor(private http: HttpClient) { }

  getAllProducts() : Observable<any>{
    const url = `${this.apiUrl}/items/products`;
    return this.http.get<any>(url);
  }

  getProductsByCollectionId(id : number) : Observable<any>{
    const url = `${this.apiUrl}/items/products?filter[collection_relation][_in]=${id}`;
    return this.http.get<any>(url);
  }

  getProductBySlug(slug : string | null) : Observable<any>{
    const url = `${this.apiUrl}/items/products?filter[slug][_eq]=${slug}`;
    return this.http.get<any>(url);
  }

  getProductById(id : number | null) : Observable<any>{
    const url = `${this.apiUrl}/items/products?filter[id][_eq]=${id}`;
    return this.http.get<any>(url);
  }

  getAttributeById(id : number): Observable<any>{
    const url = `${this.apiUrl}/items/attributes/${id}`;
    return this.http.get<any>(url);
  }

  getOptionById(id : number): Observable<any>{
    const url = `${this.apiUrl}/items/options/${id}`;
    return this.http.get<any>(url);
  }

  getSequenceByCollectionId(id : number): Observable<any>{
    const url = `${this.apiUrl}/items/sequences?filter[collection][_eq]=${id}`;
    return this.http.get<any>(url);
  }

  getSequenceAttribute(id : number): Observable<any>{
    const url = `${this.apiUrl}/items/sequences_attributes/${id}`;
    return this.http.get<any>(url);
  }

  getAttributeOption(id : number): Observable<any>{
    const url = `${this.apiUrl}/items/attributes_options/${id}`;
    return this.http.get<any>(url);
  }

}
