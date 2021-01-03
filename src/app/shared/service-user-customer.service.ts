import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCustomer } from '../models/user-customer';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserCustomerService {
  private url = "http://localhost:3000/user_customer"
  constructor(private http:HttpClient) { }

  getCustomer(id:number){
    return this.http.get(this.url + "/" + id)
  }
  postCustomer(newCustomer:UserCustomer){
    return this.http.post(this.url,newCustomer)
  }
  putCustomer(newCustomer:UserCustomer){
    return this.http.put(this.url,newCustomer)
  }
  public deleteCustomer(id:number):any {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
});
}}
