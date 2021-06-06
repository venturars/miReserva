import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shifts } from '../models/shifts';
import { Observable } from 'rxjs';
import { Global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class ServiceShiftsService {

  private global:Global = new Global();
  private url:string = this.global.url + "shifts";
  public shifts:Shifts;

  constructor(
    private http:HttpClient
  ) { }

  public getShifts(restaurant_id:number):Observable<any> {
    return this.http.get(this.url + "?restaurant_id=" + restaurant_id);
  }
  public getShiftsId(shift_id:number):Observable<any> {
    return this.http.get(this.url + "?shift_id=" + shift_id);
  }
  public getShiftsIdTimes(times_id:number):Observable<any> {
    return this.http.get(this.url+"?times_id="+times_id);
  }
  public postShifts(shift:Shifts):Observable<any> {
    return this.http.post(this.url, shift);
  }
  public putShifts(shift:Shifts):Observable<any> {
    return this.http.put(this.url, shift);
  }
  public deleteShifts(shift_id:number):Observable<any> {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {shift_id:shift_id}
});}}