import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceAPIService {
  private url = "http://localhost:3000/mi_reserva"

  constructor(private http:HttpClient) { }
}
