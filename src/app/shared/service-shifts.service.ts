import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shifts } from '../models/shifts';

@Injectable({
  providedIn: 'root'
})
export class ServiceShiftsService {
  public url="http://localhost:3000/shifts";
  public shifts:Shifts;
  constructor(public http:HttpClient) { }

  getShifts(id:number){
    return this.http.get(this.url+"/"+id);
  }

  postShifts(shift:Shifts){
    return this.http.post(this.url, shift);
  }

  putShifts(shift:Shifts){
    return this.http.put(this.url, shift);
  }

  public deleteShifts(id:number):any {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
});
}


}
