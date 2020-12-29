import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Restaurants } from '../models/restaurants'
import { Restmailpassword } from '../models/restmailpassword';

@Injectable({
  providedIn: 'root'
})
export class ServiceRestaurantService {
  public id_restaurant:any;
  private url = "http://localhost:3000/restaurant"
  constructor(private http:HttpClient) { }

  getRestaurant(id:number){
    return this.http.get(this.url + "/" + id)
  }
  postRestaurant(nuevoRestaurant:Restmailpassword){
    return this.http.post(this.url,nuevoRestaurant)
  }
  putRestaurant(nuevoRestaurant:Restaurants){
   return this.http.put(this.url,nuevoRestaurant)
  }
  public deleteRestaurant(id:number):any {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
});
}

}
