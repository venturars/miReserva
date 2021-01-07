import { Injectable } from '@angular/core';
import { Calendar } from '../models/calendar';
import { Reservations } from '../models/reservations';

@Injectable({
  providedIn: 'root'
})
export class ServiceCalendarService {
  public nuevaFecha:Calendar
  public reserva:Reservations
  public asd:string
  constructor() {
    this.nuevaFecha = new Calendar("","","","")
    this.asd
    }

  public newDate(date:Calendar):any{
    this.nuevaFecha =  date
  }

  public getDate():any{
    return this.asd
  }

}