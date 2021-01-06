import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Restaurants } from '../models/restaurants'
import { Restmailpassword } from '../models/restmailpassword';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceRestaurantService {

  public id_restaurant:number;
  public capacity:number;
  private url:string = "http://localhost:3000/restaurant";
  
  constructor(
    private http:HttpClient
  ) { }
  getRestaurant(restaurant_id?:number):Observable<any> {
    return this.http.get(this.url + "?restaurant_id" + restaurant_id);
  }
  postRestaurant(nuevoRestaurant:Restmailpassword):Observable<any> {
    return this.http.post(this.url,nuevoRestaurant);
  }
  putRestaurant(nuevoRestaurant:Restaurants):Observable<any> {
   return this.http.put(this.url,nuevoRestaurant);
  }
  public deleteRestaurant(id:number):Observable<any> {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
});}}