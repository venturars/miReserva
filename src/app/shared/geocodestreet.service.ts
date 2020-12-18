import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';


@Injectable({
  providedIn: 'root'
})
export class GeocodestreetService {
  public restaurant: Restaurant;
  // private url="https://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=json&addressdetails=1&limit=1&polygon_svg=1"
  private url

  constructor(private http:HttpClient) {
    this.restaurant= new Restaurant ("La abuela","calle santo angel, 6","28043","ajsdf@asdf.com","12931948",40,"kasdfjakds","española");
    this.url="https://nominatim.openstreetmap.org/search?q="+this.restaurant.address+",+madrid&format=json&addressdetails=1&limit=1&polygon_svg=1";
   }

  getJSONstreet(){
    return this.http.get(this.url);
  }
}
