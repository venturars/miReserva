import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserCustomerService {
  private url:string = "http://localhost:3000/user_customer";
  constructor (
    private http:HttpClient
  ) { }
  public getCustomer(id:number):Observable<any> {
    return this.http.get(this.url + "/" + id);
  }
  public postCustomer(newCustomer:any):Observable<any> {
    return this.http.post(this.url,newCustomer);
  }
  public putCustomer(newCustomer:any):Observable<any> {
    return this.http.put(this.url,newCustomer);
  }
  public deleteCustomer(id:number):Observable<any> {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
});}}