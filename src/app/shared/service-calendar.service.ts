import { Injectable } from '@angular/core';
import { Calendar } from '../models/calendar';
import { Reservations } from '../models/reservations';
import { Times } from '../models/times';

@Injectable({
  providedIn: 'root'
})
export class ServiceCalendarService {

  public nuevaFecha:Calendar;
  public reserva:Reservations;
  public times:Times[]
  public changedDayName:string
  public changedMonth:string


  constructor() {
    this.times = []
    this.nuevaFecha = new Calendar("","","","")

  }
  public newDate(date:Calendar):any {
    this.nuevaFecha =  date;
  }
  public getDate():any {
    return this.nuevaFecha;
  }
}