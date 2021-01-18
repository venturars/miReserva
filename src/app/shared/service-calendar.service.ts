import { Injectable } from '@angular/core';
import { Calendar } from '../models/calendar';
import { Reservations } from '../models/reservations';
import { Times } from '../models/times';
import { ServiceTimesService } from './service-times.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceCalendarService {
  public restaurantId;
  public nuevaFecha:Calendar;
  public reserva:Reservations;
  public times:Times[]
  public changedDayName:string
  public changedMonth:string
  public countSun:number
  public countMon:number
  public countTue:number
  public countWed:number
  public countThu:number
  public countFri:number
  public countSat:number


  constructor(private timesService: ServiceTimesService
    ) {
    this.times = []
    this.nuevaFecha = new Calendar("","","","")
    this.countSun = 0
    this.countMon = 0
    this.countTue = 0
    this.countWed = 0
    this.countThu = 0
    this.countFri = 0
    this.countSat = 0

this.getTimes(this.restaurantId)

  }
  public newDate(date:Calendar):any {
    this.nuevaFecha =  date;
  }
  public getDate():any {
    return this.nuevaFecha;
  }

  public getTimes(id:number){
    this.timesService.getTimes(id).subscribe((data4:any) =>{
      for(let i = 0; i < data4.data.length; i ++){

        switch (data4.data[i].name){
          case "Sun":
            if(data4.data[i].active == "true"){               
              this.countSun = 1
            }
          break;
          case "Mon":
            if(data4.data[i].active == "true"){   
              this.countMon = 1                      
            }
          break;
          case "Tue":
            if(data4.data[i].active == "true"){   
              this.countTue = 1             
            }
            break;
          case "Wed":
            if(data4.data[i].active == "true"){   
              this.countWed = 1             
            }
            break;
          case "Thu":
            if(data4.data[i].active == "true"){
              this.countThu = 1                
            }
            break;
          case "Fri":
            if(data4.data[i].active == "true"){ 
              this.countFri = 1               
            }
            break;
          case "Sat":
            if(data4.data[i].active == "true"){  
              this.countSat = 1              
            }
            break;        
        }

      }
  
      
    })  

  }
}