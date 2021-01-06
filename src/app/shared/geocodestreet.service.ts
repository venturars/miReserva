import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodestreetService {

  // private url="https://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=json&addressdetails=1&limit=1&polygon_svg=1"
  //              https://nominatim.openstreetmap.org/search?q=522,+calle+alcala,+madrid,+madrid&format=json&addressdetails=1&limit=1&polygon_svg=1"
 
  constructor(
    private http:HttpClient
    ) {
  }
  public getJSONstreet(url:string):Observable<any> {
    return this.http.get(url);
}}
