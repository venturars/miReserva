import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Restaurants } from '../models/restaurants'
import { Observable } from 'rxjs';
import { Global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class ServiceRestaurantService {

  private global:Global = new Global();
  private url:string = this.global.url + "/restaurant";
  private url2:string= this.global.url + "/restaurant2";
  public restauranteMapa:Restaurants;
  public restaurantReservation:Restaurants;
  public id_restaurant:number;
  public selectedRestaurant:Restaurants;
  public capacity:number;
  public create1Restaurant:Restaurants=null;
  
  constructor(
    private http:HttpClient
  ) { }
  getRestaurant(restaurant_id?:number):Observable<any> {
    return this.http.get(this.url + "?restaurant_id=" + restaurant_id);
  }
  getRestaurantByOwner(owner_id?:number):Observable<any> {
    return this.http.get(this.url + "?owner_id=" + owner_id);
  }
  postRestaurant(restaurant:Restaurants, mail:string, password:string):Observable<any> {
    return this.http.post(this.url, {
      name : restaurant.name,
      province: restaurant.province,
      city: restaurant.city,
      street_name: restaurant.street_name,
      street_number: restaurant.street_number,
      postal_code: restaurant.postal_code,
      phone: restaurant.phone,
      capacity: restaurant.capacity,
      food_type: restaurant.food_type,
      header: restaurant.header,
      logo: restaurant.logo,
      menu: restaurant.menu,
      url: restaurant.url,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      owner_id: restaurant.owner_id,
      mail: mail,
      password: password
  });}
  putRestaurant(restaurant:Restaurants, password:string):Observable<any> {
    return this.http.put(this.url, {
      name : restaurant.name,
      province: restaurant.province,
      city: restaurant.city,
      street_name: restaurant.street_name,
      street_number: restaurant.street_number,
      postal_code: restaurant.postal_code,
      phone: restaurant.phone,
      capacity: restaurant.capacity,
      food_type: restaurant.food_type,
      header: restaurant.header,
      logo: restaurant.logo,
      menu: restaurant.menu,
      url: restaurant.url,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      owner_id: restaurant.owner_id,
      password: password
  });}
  public deleteRestaurant(restaurant_id:number):Observable<any> {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {restaurant_id:restaurant_id}
});}
putRestaurant2(restaurant:Restaurants):Observable<any> {
  return this.http.put(this.url2, restaurant );}
}