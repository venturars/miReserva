import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Times } from '../models/times';

@Injectable({
  providedIn: 'root'
})
export class ServiceTimesService {

  private url:string = "http://localhost:3000/times";
  public times:Times;
  public inicio:string;
  public fin:string;

  constructor(
    private http:HttpClient
  ) { }
  public getTimes(restaurant_id:number):Observable<any> {
    return this.http.get(this.url + "?restaurant_id=" + restaurant_id);
  }
  public getTimesId(times_id:number):Observable<any> {
    return this.http.get(this.url +"?times_id="+ times_id);
  }
  public checkTimes(restaurant_name:any,restaurant_id:any,service:any):Observable<any> {
    return this.http.get(this.url+"?name="+restaurant_name+"&restaurant_id="+restaurant_id+"&service="+service);
  }
  public checkDaysTimes(restaurant_name:any,restaurant_id:any):Observable<any>{
    return this.http.get(this.url+"?name="+restaurant_name+"&restaurant_id="+restaurant_id);
  }
  public postTimes(times:Times):Observable<any> {
    return this.http.post(this.url,times);
  }
  public putTimes(times:Times):Observable<any> {
    return this.http.put(this.url, times);
  }
  public deleteTimes(id:number):Observable<any> {    
    return this.http.request('DELETE', this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
});}}