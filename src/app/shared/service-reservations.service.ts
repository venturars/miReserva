import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservations } from '../models/reservations';
import { Observable } from 'rxjs';
import { Times } from '../models/times';
import { Shifts } from '../models/shifts';
import { Global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class ServiceReservationsService {

  private global:Global = new Global();
  private url:string = this.global.url + "/reservations";  
  public reservation:Reservations
  public reservationId:number
  public pax:number
  public time:string
  public dayName:string
  public dayNum:string
  public month:string
  public year:string
  public reservations:Reservations[]
  public times:Times[]
  public shifts:Shifts[]
  public tableId:number
  public shiftId:number
  public obs:string

  constructor(
    private http:HttpClient
  ) { 
    this.tableId = 0
    this.reservations = []
    this.shifts = []
    this.times = []
  }
  public getReservationRestaurant(restaurant_id:number):Observable<any> {
    return this.http.get(this.url + "?restaurant=" + restaurant_id);
  }
  public getReservationClient(customer_id:number):Observable<any> {
    return this.http.get(this.url + "?customer=" + customer_id);
  }
  public getReservationPax(shift_id:number,dayName:string,dayNum:string,month:string,year:string):Observable<any> {
    return this.http.get(this.url + "?shift_id=" + shift_id + "&dayName=" + dayName + "&dayNum=" + dayNum + "&month=" + month + "&year=" + year);
  }
  public postReservation(newReservation:Reservations):Observable<any> {
    return this.http.post(this.url,newReservation);
  }
  public putReservation(newReservation:Reservations):Observable<any> {
    return this.http.put(this.url,newReservation)
  }
  public deleteReservation(reservation_id:number):Observable<any> {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {reservation_id:reservation_id}
});}}