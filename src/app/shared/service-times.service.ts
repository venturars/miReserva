import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Times } from '../models/times';

@Injectable({
  providedIn: 'root'
})
export class ServiceTimesService {

  private url:string = "http://localhost:3000/times";
  private url2:string = "http://localhost:3000/times1";
  private url3:string = "http://localhost:3000/times2";
  public times:Times;
  public inicio:string;
  public fin:string;

  constructor(
    private http:HttpClient
  ) {
  }
  public getTimes(restaurant_id:number):Observable<any> {
    return this.http.get(this.url + "?restaurant_id=" + restaurant_id);
  }
  public getTimesId(times_id:number):Observable<any> {
    return this.http.get(this.url +"?times_id"+ times_id);
  }
  public checkTimes(name:any,restaurant:any,service:any):Observable<any> {
    return this.http.get(this.url2+"?name="+name+"&restaurant_id="+restaurant+"&service="+service);
  }

  public checkDaysTimes(name:any,restaurant:any):Observable<any>{
    return this.http.get(this.url3+"?name="+name+"&restaurant_id="+restaurant);
  }

  public postTimes(times:Times):Observable<any> {
    return this.http.post(this.url,times);
  }
  public putTimes(times:Times):Observable<any> {
    return this.http.put(this.url, times);
  }
  public deleteTimes(id:number):Observable<any> {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
});}}