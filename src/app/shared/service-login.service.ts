import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../models/global';
import { Users } from '../models/users';
import { UserCustomer } from '../models/user-customer';
import { UserOwner } from '../models/user-owner';
import { Restaurants } from '../models/restaurants';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {
  private global:Global = new Global();
  private url:string = this.global.url + "/login";
  public users:Users;
  public userCustomer:UserCustomer;
  public userOwner:UserOwner;
  public userRestaurant:Restaurants;
  
  constructor(
    private http:HttpClient
  ) { }
  public flush() {
    let flushUsers:any = JSON.parse(localStorage.getItem('users'));
    let flushUserCustomer:any = JSON.parse(localStorage.getItem('userCustomer'));
    let flushUserOwner:any = JSON.parse(localStorage.getItem('userOwner'));
    let flushUserRestaurant:any = JSON.parse(localStorage.getItem('userRestaurant'));
    this.users = new Users(
      flushUsers.restaurant_id,
      flushUsers.owner_id,
      flushUsers.customer_id,
      flushUsers.mail,
      flushUsers.password,
    );
    this.userCustomer = new UserCustomer(
      flushUserCustomer.customer_id,
      flushUserCustomer.phone,
      flushUserCustomer.name,
      flushUserCustomer.surname,
      flushUserCustomer.photo
    );
    this.userOwner = new UserOwner(
      flushUserOwner.owner_id,
      flushUserOwner.cif,
      flushUserOwner.name,
      flushUserOwner.surname,
      flushUserOwner.photo
    );
    this.userRestaurant = new Restaurants(
      flushUserRestaurant.restaurant_id,
      flushUserRestaurant.name,
      flushUserRestaurant.province,
      flushUserRestaurant.city,
      flushUserRestaurant.street_name,
      flushUserRestaurant.street_number,
      flushUserRestaurant.postal_code,
      flushUserRestaurant.phone,
      flushUserRestaurant.capacity,
      flushUserRestaurant.food_type,
      flushUserRestaurant.header,
      flushUserRestaurant.logo,
      flushUserRestaurant.menu,
      flushUserRestaurant.url,
      flushUserRestaurant.latitude,
      flushUserRestaurant.longitude,
      flushUserRestaurant.owner_id,
  );}
  public getUsers(
    mail:string,
    password:string
  ):Observable<any> {
    return this.http.post(this.url, {
      "mail": mail,
      "password": password
});}}