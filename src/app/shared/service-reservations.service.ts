import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservations } from '../models/reservations';
import { Observable } from 'rxjs';
import { Times } from '../models/times';
import { Shifts } from '../models/shifts';
import { StickyDirection } from '@angular/cdk/table';

@Injectable({
  providedIn: 'root'
})
export class ServiceReservationsService {
  private url:string = "http://localhost:3000/reservations";

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
  public getReservationRestaurant(id:number):Observable<any> {
    return this.http.get(this.url + "?restaurant=" + id);
  }
  public getReservationClient(id:number):Observable<any> {
    return this.http.get(this.url + "?customer=" + id);
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
  public deleteReservation(id:number):Observable<any> {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
});}}