import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserOwnerService {

  private global:Global = new Global();
  private url:string = this.global.url + "/user_owner";

  constructor(
    private http:HttpClient
  ) { }

  public getOwner(owner_id:number):Observable<any> {
    return this.http.get(this.url + "/" + owner_id);
  }
  public postOwner(newOwner:any):Observable<any> {
    return this.http.post(this.url,newOwner);
  }
  public putOwner(newOwner:any):Observable<any> {
    return this.http.put(this.url,newOwner);
  }
  public deleteOwner(owner_id:number):Observable<any> {    
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {owner_id:owner_id}
});}}