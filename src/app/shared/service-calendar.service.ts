import { Injectable } from '@angular/core';
import { Calendar } from '../models/calendar';
import { Reservations } from '../models/reservations';
import { Times } from '../models/times';
import { ServiceTimesService } from './service-times.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceCalendarService {
  
  public restaurantId:number;
  private newDateCalendar:Calendar = new Calendar("","","","");
  public reserva:Reservations;
  public times:Times[] = new Array();
  public changedDayName:string;
  public changedMonth:string;
  public count:any = {
    Sun: false,
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false
  }
  constructor(
    private timesService: ServiceTimesService,
    private router:Router
  ) { }
  public getNewDate():Calendar {
    return this.newDateCalendar;
  }
  public setNewDate(date:Calendar) {
    this.newDateCalendar =  date;
  }
  public getTimes(restaurant_id:number) {
    console.log('pillo times');
    this.timesService.getTimes(restaurant_id).subscribe((result:any) =>{
      for(let i = 0; i < result.data.length; i ++) {
        switch (result.data[i].name){
          case "Sun":
            if(result.data[i].active == "true") {
                this.count.Sun = true;
            }
            break;
          case "Mon":
            if(result.data[i].active == "true") {
              this.count.Mon = true;
            }
            break;
          case "Tue":
            if(result.data[i].active == "true") {
              this.count.Tue = true;
            }
            break;
          case "Wed":
            if(result.data[i].active == "true") {
              this.count.Wed = true;
            }
            break;
          case "Thu":
            if(result.data[i].active == "true") {
              this.count.Thu = true;
            }
            break;
          case "Fri":
            if(result.data[i].active == "true") {
              this.count.Fri = true;
            }
            break;
          case "Sat":
            if(result.data[i].active == "true") {
              this.count.Sat = true;
            }
            break;        
      }}
      this.router.navigate(['/reservation1']);
});}}