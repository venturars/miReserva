import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodestreetService {

  constructor(
    private http:HttpClient
    ) { }
  public getJSONstreet(url:string):Observable<any> {
    return this.http.get(url);
}}
