import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class ServiceRegistrationService {

  private global:Global = new Global();
  private url:string = this.global.url + "/registration";

  constructor(
    private http:HttpClient
  ) { }
  public registrationOwner(newOwner:any) {
    return this.http.post(this.url, newOwner);
  }
  
  public registrationCustomer(newCustomer:any) {
     return this.http.post(this.url, newCustomer);
  }
  public checkMailFree(mail:any) {
    return this.http.get(this.url+ "?mail=" + mail);
}}