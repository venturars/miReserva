import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { Restaurants } from '../models/restaurants';
import { UserOwner } from '../models/user-owner';
import { UserCustomer } from '../models/user-customer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  private url:string = "http://localhost:3000/login";
  public users: Users;
  public restaurants: Restaurants;
  public userOwner: UserOwner;
  public userCustomer: UserCustomer;
  
  constructor(
    private http:HttpClient,
    private router:Router
  ) { }
  public getUsers(
    mail:string,
    password:string
  ) {
    this.http.post(this.url, {
      "mail": mail,
      "password": password
    }).subscribe((response:any) => {
        
      if(response.control) {
        this.users = new Users(
          response.data[0].restaurant_id,
          response.data[0].owner_id,
          response.data[0].customer_id,
          mail,
          password
        )
        if(this.users.restaurant_id) {
          this.restaurants = new Restaurants(
            response.data[0].restaurant_id,
            response.data[0].name,
            response.data[0].province,
            response.data[0].city,
            response.data[0].street_name,
            response.data[0].street_number,
            response.data[0].postal_code,
            response.data[0].phone,
            response.data[0].capacity,
            response.data[0].food_type,
            response.data[0].header,
            response.data[0].logo,
            response.data[0].menu,
            response.data[0].url,
            response.data[0].latitude,
            response.data[0].longitude,
            response.data[0].ownwer_id
          )
          this.router.navigate(['/reservations-list-restaurant']);
        }else if(this.users.owner_id) {
          this.userOwner = new UserOwner(
            response.data[0].owner_id,
            response.data[0].cif,
            response.data[0].name,
            response.data[0].surname,
            response.data[0].photo
          )  
          this.router.navigate(['/restaurants-list']);
        }else if(this.users.customer_id) {
          this.userCustomer= new UserCustomer(
            response.data[0].customer_id,
            response.data[0].phone,
            response.data[0].name,
            response.data[0].surname,
            response.data[0].photo
          ) 
          this.router.navigate(['/search']);
      }}else {
      this.router.navigate(['/']);
}});}}