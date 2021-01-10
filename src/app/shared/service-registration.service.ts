import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceRegistrationService {

public url:string="http://localhost:3000/registration";

  constructor(
    private http:HttpClient
  ) { }
  public registrationOwner(newOwner:any){
    return this.http.post(this.url, newOwner);
  }
  
  public registrationCustomer(newCustomer:any){
     return this.http.post(this.url, newCustomer);
  }
  public checkMailFree(mail:any){
    return this.http.get(this.url+ "?mail=" + mail);
}}