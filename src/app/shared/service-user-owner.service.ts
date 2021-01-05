import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceUserOwnerService {
  private url = "http://localhost:3000/user_owner";
  constructor(private http:HttpClient) { }

  getOwner(id:number):Observable<any> {
    return this.http.get(this.url + "/" + id);
  }
  postOwner(newOwner:any):Observable<any> {
    return this.http.post(this.url,newOwner);
  }
  putOwner(newOwner:any):Observable<any> {
    return this.http.put(this.url,newOwner);
  }
  public deleteOwner(id:number):Observable<any> {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
});}}