import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserCustomerService {
  private global:Global = new Global();
  private url:string = this.global.url + "/user_customer";

  constructor (
    private http:HttpClient
  ) { }
  public getCustomer(customer_id:number):Observable<any> {
    return this.http.get(this.url + "/" + customer_id);
  }
  public postCustomer(newCustomer:any):Observable<any> {
    return this.http.post(this.url,newCustomer);
  }
  public putCustomer(newCustomer:any):Observable<any> {
    return this.http.put(this.url,newCustomer);
  }
  public deleteCustomer(customer_id:number):Observable<any> {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {customer_id:customer_id}
});}}