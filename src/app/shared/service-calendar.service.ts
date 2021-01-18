import { Injectable } from '@angular/core';
import { Calendar } from '../models/calendar';
import { Reservations } from '../models/reservations';
import { Times } from '../models/times';
import { ServiceTimesService } from './service-times.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceCalendarService {
  
  public restaurantId:number;
  private newDateCalendar:Calendar;
  public reserva:Reservations;
  public times:Times[]
  public changedDayName:string;
  public changedMonth:string;
  public count:any = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0
  }

  constructor(
    private timesService: ServiceTimesService,
  ) {
    this.times = [],
    this.newDateCalendar = new Calendar("","","",""),
    this.getTimes(this.restaurantId);
  }
  public getNewDate():any {
    return this.newDateCalendar;
  }
  public setNewDate(date:Calendar):any {
    this.newDateCalendar =  date;
  }
  public getTimes(restaurant_id:number) {
    this.timesService.getTimes(restaurant_id).subscribe((result:any) =>{
      for(let i = 0; i < result.data.length; i ++){

        switch (result.data[i].name){
          case "Sun":
            if(result.data[i].active == "true") {
              this.count.Sun = 1
            }
            break;
          case "Mon":
            if(result.data[i].active == "true") {
              this.count.Mon = 1                      
            }
            break;
          case "Tue":
            if(result.data[i].active == "true") {
              this.count.Tue = 1             
            }
            break;
          case "Wed":
            if(result.data[i].active == "true") {
              this.count.Wed = 1             
            }
            break;
          case "Thu":
            if(result.data[i].active == "true") {
              this.count.Thu = 1                
            }
            break;
          case "Fri":
            if(result.data[i].active == "true") {
              this.count.Fri = 1               
            }
            break;
          case "Sat":
            if(result.data[i].active == "true") {
              this.count.Sat = 1              
            }
            break;        
}}});}}