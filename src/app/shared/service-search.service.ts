import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceSearchService {

  private url:string = "http://localhost:3000/search";

  constructor(
    private http:HttpClient
  ) { }
  
  public initialSearch():Observable<any> {
    return this.http.get(this.url);
}}