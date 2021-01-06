import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tables } from '../models/tables';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceTablesService {

  private url="http://localhost:3000/tables";
  public table:Tables[];

  constructor(
    private http:HttpClient
  ) {
    this.table=[];
  }
  public getTables(id:number):Observable<any> {
    return this.http.get(this.url+"/"+id);
  }
  public putTables(table:Tables):Observable<any> {
    return this.http.put(this.url, table);
  }
  public postTables(table:Tables):Observable<any> {
   return this.http.post(this.url, table);
  }
  public deleteTables(id:number):Observable<any> {
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {table_id:id}
});}}