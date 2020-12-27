import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tables } from '../models/tables';

@Injectable({
  providedIn: 'root'
})
export class ServiceTablesService {
  public url="http://localhost:3000/tables";
  public table:Tables;
  constructor(public http:HttpClient) { }

  getTables(id:number){
    return this.http.get(this.url+"/"+id);
  }

  putTables(table:Tables){
    return this.http.put(this.url, table)
  }

  postTables(table:Tables){
    return this.http.post(this.url, table)
  }

  deleteTables(id:number):any{
    return this.http.request('DELETE',this.url, {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
      body: {id:id}
});
  }


}
