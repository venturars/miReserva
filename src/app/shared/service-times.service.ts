import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Times } from '../models/times';

@Injectable({
  providedIn: 'root'
})
export class ServiceTimesService {
  public url="http://localhost:3000/times";
  public times:Times;
  constructor(public http:HttpClient) {

   }

  public getTimes(id:number):any{
    return this.http.get(this.url+"/"+id )
  }
  
 public postTimes(times:Times):any{
    return this.http.post(this.url,times)
  }

 public putTimes(times:Times){
    return this.http.put(this.url, times);
  }

  

  public deleteTimes(id:number):any {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
});
}

}