import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceRegistrationService {
public url:string="http://localhost:3000/registration";
  constructor(private http:HttpClient) { }

  
}
