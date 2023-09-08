import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class WebContentService {

  private apiUrl = 'https://directus.thelightprojekt.com';

  constructor(private http: HttpClient) { }

  getMenuLinks() : Observable<any>{
    const url = `${this.apiUrl}/items/menu_header`;
    return this.http.get<any[]>(url);
  }

  getPageProductContent(): Observable<any>{
    const url = `${this.apiUrl}/items/product_page`;
    return this.http.get<any>(url);
  }

  getCartPageContent(): Observable<any>{
    const url = `${this.apiUrl}/items/cart_page`;
    return this.http.get<any>(url);
  }

  getCartLinks() : Observable<any>{
    const url = `${this.apiUrl}/items/cart_links`;
    return this.http.get<any[]>(url);
  }

  getImagesByProductId(id: number) : Observable<any>{
    const url = `${this.apiUrl}/items/products_files?filter[products_id][_eq]=${id}`;
    return this.http.get<any>(url);
  }

  getFileById(id : string): Observable<any>{
    const url = `${this.apiUrl}/files/${id}`;
    return this.http.get<any>(url);
  }

}
