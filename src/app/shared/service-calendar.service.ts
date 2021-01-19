import { Injectable } from '@angular/core';
import { Calendar } from '../models/calendar';
import { Reservations } from '../models/reservations';
import { Times } from '../models/times';
import { ServiceTimesService } from './service-times.service';
import { Router } from '@angular/router';
import { ServiceShiftsService } from './service-shifts.service';
import { ServiceLoginService } from './service-login.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceCalendarService {
  
  public restaurantId: number;
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
    private shiftsService: ServiceShiftsService,
    private router:Router,
    private serviceLogin:ServiceLoginService
  ) { }
  public getNewDate():Calendar {
    return this.newDateCalendar;
  }
  public setNewDate(date:Calendar) {
    this.newDateCalendar =  date;
  }
  public getTimes(restaurant_id:number) {
    this.count.Sun = null;
    this.count.Mon = null;
    this.count.Tue = null;
    this.count.Wed = null;
    this.count.Thu = null;
    this.count.Fri = null;
    this.count.Sat = null;
    this.timesService.getTimes(restaurant_id).subscribe((result:any) =>{
      this.shiftsService.getShifts(restaurant_id).subscribe((resultShift) =>{
        console.log(resultShift.data);
      for(let i = 0; i < result.data.length; i ++) {
        
        switch (result.data[i].name){
          case "Sun":
            if(result.data[i].active == "true") {
               for (let j=0;j<resultShift.data.length;j++){
                  if(resultShift.data[j].day=="Sun"){
                    this.count.Sun = true;
                  }
               }
              
            }
            break;
          case "Mon":
            if(result.data[i].active == "true") {
              for (let j=0;j<resultShift.data.length;j++){
                if(resultShift.data[j].day=="Mon"){
                  this.count.Mon = true;
                }
              }  
            }
            break;
          case "Tue":
            if(result.data[i].active == "true") {
              for (let j=0;j<resultShift.data.length;j++){
                if(resultShift.data[j].day=="Tue"){
                  this.count.Tue = true;
                }
              }
            }
            break;
          case "Wed":
            if(result.data[i].active == "true") {
              for (let j=0;j<resultShift.data.length;j++){
                if(resultShift.data[j].day=="Wed"){
                  this.count.Wed = true;
                }
              }
            }
            break;
          case "Thu":
            if(result.data[i].active == "true") {
              for (let j=0;j<resultShift.data.length;j++){
                if(resultShift.data[j].day=="Thu"){
                  this.count.Thu = true;
                }
              }
            }
            break;
          case "Fri":
            if(result.data[i].active == "true") {
              for (let j=0;j<resultShift.data.length;j++){
                if(resultShift.data[j].day=="Fri"){
                  this.count.Fri = true;
                }
              }
            }
            break;
          case "Sat":
            if(result.data[i].active == "true") {
              for (let j=0;j<resultShift.data.length;j++){
                if(resultShift.data[j].day=="Sat"){
                  this.count.Sat = true;
                }
              }
            }
            break;        
      }}

      if(this.serviceLogin.users.customer_id){
      this.router.navigate(['/reservation1']);
      }
    })});}}