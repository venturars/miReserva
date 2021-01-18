import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tables } from '../models/tables';
import { Observable } from 'rxjs';
import { Global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class ServiceTablesService {

  private global:Global = new Global();
  private url:string = this.global.url + "/tables";
  public table:Tables[] = new Array();

  constructor(
    private http:HttpClient
  ) { }
  public getTables(restaurant_id:number):Observable<any> {
    return this.http.get(this.url+"/"+restaurant_id);
  }
  public putTables(table:Tables):Observable<any> {
    return this.http.put(this.url, table);
  }
  public postTables(table:Tables):Observable<any> {
   return this.http.post(this.url, table);
  }
  public deleteTables(table_id:number):Observable<any> {
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {table_id:table_id}
});}}