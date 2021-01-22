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
  // public users: Users = new Users(288,null,null,"kibona@kibona","kibona");
  public userRestaurant: Restaurants;
  // public userRestaurant: Restaurants = new Restaurants(288,"Kibon","Madrid","Alcala de Henares","menorca","12",28009,912403939,30,"Japonesa","assets/photos/KIBONAJAPO.jpg","assets/photos/logokibona.jpg",null,"www.kibon.com",40.4857747,-3.3436791,10);
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