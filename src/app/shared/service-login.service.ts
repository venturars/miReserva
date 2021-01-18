import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { Restaurants } from '../models/restaurants';
import { UserOwner } from '../models/user-owner';
import { UserCustomer } from '../models/user-customer';
import { Observable } from 'rxjs';
import { Global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {
  private global:Global = new Global();
  private url:string = this.global.url + "/login";
  public users: Users = new Users(null,null,null,null,null);
  public userRestaurant: Restaurants;
  public userOwner: UserOwner;
  public userCustomer: UserCustomer;
  
  constructor(
    private http:HttpClient
  ) { }
  public getUsers(
    mail:string,
    password:string
  ):Observable<any> {
    return this.http.post(this.url, {
      "mail": mail,
      "password": password
});}}