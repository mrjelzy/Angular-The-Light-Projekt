import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private apiUrl = process.env['API_URI'];

  constructor(private http: HttpClient) { }

  getCollections() : Observable<any>{
    const url = `${this.apiUrl}/items/collections`;
    return this.http.get<any>(url);
  }

  getCollectionBySlug(slug: string | null) : Observable<any>{
    const url = `${this.apiUrl}/items/collections?filter[slug][_eq]=${slug}`;
    return this.http.get<any>(url);
  }

  getCollectionById(id: number) : Observable<any>{
    const url = `${this.apiUrl}/items/collections/${id}`;
    return this.http.get<any>(url);
  }
}
