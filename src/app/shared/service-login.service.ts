import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {
  private url:string = "http://localhost:3000/login";
  /* public userCustomer =  */
  constructor(
    private http:HttpClient
  ) { }
  public getUsers(
    mail:string,
    password:string
  ) {
    return this.http.post(this.url, {
      "mail": mail,
      "password": password
    })
  }
}