import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceSearchService {

  private url:string = "http://localhost:3000/search"

  constructor(private http:HttpClient) { }
  
  public initialSearch() {
    return this.http.get(this.url)
  }
}