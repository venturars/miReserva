import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {
  private global:Global = new Global();
  private url:string = this.global.url + "/login";
  
  constructor(
    private http:HttpClient
  ) { }
  public getUsers(
    mail:string,
    password:string
  ):Observable<any> {
    return this.http.post(this.url, {
      "mail": mail,
      "password": password
});}}