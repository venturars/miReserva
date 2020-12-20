import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';


@Injectable({
  providedIn: 'root'
})
export class GeocodestreetService {
  public restaurant: Restaurant;
  // private url="https://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=json&addressdetails=1&limit=1&polygon_svg=1"
  //              https://nominatim.openstreetmap.org/search?q=522,+calle+alcala,+madrid,+madrid&format=json&addressdetails=1&limit=1&polygon_svg=1"
  private url

  constructor(private http:HttpClient) {
    this.restaurant= new Restaurant ("La abuela","calle alcala","522","madrid","28043","laabuela@gmail.com","12812892",42,"ajskdfka","kasdkf",null,null,null,null);
    this.url="https://nominatim.openstreetmap.org/search?q="+this.restaurant.addressnumber+",+"+this.restaurant.address.replace(" ","+")+",+"+this.restaurant.city+"&format=json&addressdetails=1&limit=1&polygon_svg=1";
   }

  getJSONstreet(){
    console.log(this.url);
    return this.http.get(this.url);
  }
}
