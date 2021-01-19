import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { Calendar } from 'src/app/models/calendar';
import { Shifts } from 'src/app/models/shifts';
import { Times } from 'src/app/models/times';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';
import { ServiceShiftsService } from 'src/app/shared/service-shifts.service';
import { ServiceTimesService } from 'src/app/shared/service-times.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar') calendar: MatCalendar<Moment>;
  
  public selectedDate: Moment;
  public restaurantId:number = this.serviceCalendar.restaurantId;
  public times: Times[]
  public shifts: Shifts[]
  public changedDayName:string
  public changedMonth:string
  public minDate:Date;
  public maxDate:Date;
  public selectDay:Date;
  public date:Calendar
  public today:Date
  public availableTimes:Times[]
  public countSun:number = 0;
  public countMon:number = 0;
  public countTue:number = 0;
  public countWed:number = 0;
  public countThu:number = 0;
  public countFri:number = 0;
  public countSat:number = 0;
  public count:any = {
    Sun: null,
    Mon: null,
    Tue: null,
    Wed: null,
    Thu: null,
    Fri: null,
    Sat: null
  }
  constructor(
    private serviceCalendar: ServiceCalendarService,
    private shiftsService: ServiceShiftsService,
    private timesService: ServiceTimesService,
    ) {
      this.shifts = []
      this.times = []
      this.today = new Date()
      this.availableTimes = []
      let name = this.today.toString().substring(0,3)
      let month = this.today.toString().substr(4,3)
      let day = this.today.toString().substr(8,2)
      let year = this.today.toString().substr(11,4);
      this.date = new Calendar(name, day, month, year)
      this.serviceCalendar.setNewDate(this.date);

  switch (name){
    case "Sun":
      this.changedDayName = "Domingo";
      break;
    case "Mon":
      this.changedDayName = "Lunes";
      break;
    case "Tue":
      this.changedDayName = "Martes";
      break;
    case "Wed":
      this.changedDayName = "Miercoles";
      break;
    case "Thu":
      this.changedDayName = "Jueves";
      break;
    case "Fri":
      this.changedDayName = "Viernes";
      break;
    case "Sat":
      this.changedDayName = "Sabado";
      break;        
  }
  switch (month){
    case "Jan":
      this.changedMonth = "Enero";
      break;
    case "Feb":
      this.changedMonth = "Febrero";
      break;
    case "Mar":
      this.changedMonth = "Marzo";
      break;
    case "Apr":
      this.changedMonth = "Abril";
      break;
    case "May":
      this.changedMonth = "Mayo";
      break;
    case "Jun":
      this.changedMonth = "Junio";
      break;
    case "Jul":
      this.changedMonth = "Julio";
      break;        
    case "Aug":
      this.changedMonth = "Agosto";
      break;
    case "Sep":
      this.changedMonth = "Septiembre";
      break;
    case "Oct":
      this.changedMonth = "Octubre";
      break;
    case "Nov":
      this.changedMonth = "Noviembre";
      break;
    case "Dic":
      this.changedMonth = "Diciembre";
      break;    
    }
    this.serviceCalendar.changedDayName = this.changedDayName
    this.serviceCalendar.changedMonth = this.changedMonth
    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    
    this.minDate = new Date(currentYear,currentMonth,currentDay);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
  }
  
  public getChangedValue(e:Date)  {
    this.times = []
    this.serviceCalendar.times =[]
    let name = e.toString().substring(0,3)
    let month = e.toString().substr(4,3)
    let day = e.toString().substr(8,2)
    let year = e.toString().substr(11,4);
    this.date = new Calendar(name, day, month, year)
    this.selectDay = e;
    this.serviceCalendar.setNewDate(this.date);


    let currentDayName = name;
    console.log(this.restaurantId);
    this.timesService.getTimes(this.restaurantId).subscribe((dataTimes:any) =>{                    
      for(let i = 0; i < dataTimes.data.length; i++){   
                         
        if(dataTimes.data[i].name == currentDayName){
          if(dataTimes.data[i].active == "true"){
  
        let time = new Times (dataTimes.data[i].times_id,
          dataTimes.data[i].name,
          dataTimes.data[i].time_from,
          dataTimes.data[i].time_to,
          dataTimes.data[i].restaurant_id,
          dataTimes.data[i].service,
          dataTimes.data[i].active)
          this.shiftsService.getShiftsIdTimes(dataTimes.data[i].times_id).subscribe((dataShifts:any) =>{   
            for(let i = 0; i < dataShifts.data.length; i++){
              let shift = new Shifts (dataShifts.data[i].shift_id,
                dataShifts.data[i].day,
                dataShifts.data[i].shift_from,
                dataShifts.data[i].shift_to,
                dataShifts.data[i].restaurant_id,
                dataShifts.data[i].times_id,
                dataShifts.data[i].pax);
                
                this.shifts.push(shift)
              }    
            })
            this.times.push(time)
            this.serviceCalendar.times.push(time)                        
          }}}   
    })
  
    switch (name){
      case "Sun":
        this.changedDayName = "Domingo";
        break;
      case "Mon":
        this.changedDayName = "Lunes";
        break;
      case "Tue":
        this.changedDayName = "Martes";
        break;
      case "Wed":
        this.changedDayName = "Miercoles";
        break;
      case "Thu":
        this.changedDayName = "Jueves";
        break;
      case "Fri":
        this.changedDayName = "Viernes";
        break;
      case "Sat":
        this.changedDayName = "Sabado";
        break;        
    }
    switch (month){
      case "Jan":
        this.changedMonth = "Enero";
        break;
      case "Feb":
        this.changedMonth = "Febrero";
        break;
      case "Mar":
        this.changedMonth = "Marzo";
        break;
      case "Apr":
        this.changedMonth = "Abril";
        break;
      case "May":
        this.changedMonth = "Mayo";
        break;
      case "Jun":
        this.changedMonth = "Junio";
        break;
      case "Jul":
        this.changedMonth = "Julio";
        break;        
      case "Aug":
        this.changedMonth = "Agosto";
        break;
      case "Sep":
        this.changedMonth = "Septiembre";
        break;
      case "Oct":
        this.changedMonth = "Octubre";
        break;
      case "Nov":
        this.changedMonth = "Noviembre";
        break;
      case "Dic":
        this.changedMonth = "Diciembre";
        break;        
    }

  this.serviceCalendar.changedDayName = this.changedDayName
  this.serviceCalendar.changedMonth = this.changedMonth
  }
  public myDateFilter = (date:Date) => {
      let day = date.getDay();
      let control:number = 0;
        if (this.serviceCalendar.count.Sun && day == 0) {
          this.count.Sun = 0
          control = 1;
        }
        if (this.serviceCalendar.count.Mon && day == 1) {
          this.count.Mon = 1
          control = 1;
        }
        if (this.serviceCalendar.count.Tue && day == 2) {
          this.count.Tue = 2
          control = 1;
        }
        if (this.serviceCalendar.count.Wed && day == 3) {
          this.count.Wed = 3
          control = 1;
        }
        if (this.serviceCalendar.count.Thu && day == 4) {
          this.count.Thu = 4
          control = 1;
        }
        if (this.serviceCalendar.count.Fri != 0 && day == 5) {
        this.count.Fri = 5
        control = 1;
      }
      if (this.serviceCalendar.count.Sat != 0 && day == 6) {
        this.count.Sat = 6;
        control = 1;
      }
      return control;
}}