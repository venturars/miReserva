import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class ServiceSearchService {
  
  private global:Global = new Global();
  private url:string = this.global.url + "search";

  constructor(
    private http:HttpClient
  ) { }
  
  public initialSearch():Observable<any> {
    return this.http.get(this.url);
}}