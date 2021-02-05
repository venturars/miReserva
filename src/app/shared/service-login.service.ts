import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../models/global';
import { Users } from '../models/users';
import { UserCustomer } from '../models/user-customer';
import { UserOwner } from '../models/user-owner';
import { Restaurants } from '../models/restaurants';
import { Router } from '@angular/router';

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
  public router;
  
  constructor(
    private http:HttpClient, router: Router
  ) { }
  public save() {
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('userCustomer', JSON.stringify(this.userCustomer));
    localStorage.setItem('userOwner', JSON.stringify(this.userOwner));
    localStorage.setItem('userRestaurant', JSON.stringify(this.userRestaurant));
  }
  public flush() {
    let flushUsers:any = (localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')):new Users(null,null,null,null,null);
    let flushUserCustomer:any = (localStorage.getItem('userCustomer'))?JSON.parse(localStorage.getItem('userCustomer')):new UserCustomer(null,null,null,null,null);
    let flushUserOwner:any = (localStorage.getItem('userOwner'))?JSON.parse(localStorage.getItem('userOwner')):new UserOwner(null,null,null,null,null);
    let flushUserRestaurant:any = (localStorage.getItem('userRestaurant'))?JSON.parse(localStorage.getItem('userRestaurant')):new Restaurants(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
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
    return this.http.post(this.router.url, {
      "mail": mail,
      "password": password
});}}