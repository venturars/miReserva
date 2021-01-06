import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservations } from '../models/reservations';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceReservationsService {

  private url:string = "http://localhost:3000/reservations";

  constructor(
    private http:HttpClient
  ) { }
  public getReservationRestaurant(id:number):Observable<any> {
    return this.http.get(this.url + "?restaurant=" + id);
  }
  public getReservationClient(id:number):Observable<any> {
    return this.http.get(this.url + "?customer=" + id);
  }
  public postReservation(newReservation:Reservations):Observable<any> {
    return this.http.post(this.url,newReservation);
  }
  public putReservation(newReservation:Reservations):Observable<any> {
    return this.http.put(this.url,newReservation)
  }
  public deleteReservation(id:number):Observable<any> {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
});}}