import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservations } from '../models/reservations';

@Injectable({
  providedIn: 'root'
})
export class ServiceReservationsService {
  private url = "http://localhost:3000/reservations"
  constructor(private http:HttpClient) { }
  
  getReservationRestaurant(id:number){
    return this.http.get(this.url + "?restaurant=" + id)
  }
  
  getReservationClient(id:number){
    return this.http.get(this.url + "?customer=" + id)
  }
  postReservation(newReservation:Reservations){
    return this.http.post(this.url,newReservation)
  }

  putReservation(newReservation:Reservations){
    return this.http.put(this.url,newReservation)
  }
  public deleteReservation(id:number):any {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
  });
  }
}