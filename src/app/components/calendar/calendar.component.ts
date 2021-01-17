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
import { ServiceRestaurantService } from '../../shared/service-restaurant.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public restaurantId:number;
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
    public countSun:number
    public countMon:number
    public countTue:number
    public countWed:number
    public countThu:number
    public countFri:number
    public countSat:number
    public sun:number
    public mon:number
    public tue:number
    public wed:number
    public thu:number
    public fri:number
    public sat:number


  @ViewChild('calendar') calendar: MatCalendar<Moment>;
  public selectedDate: Moment;

  constructor(private calendarService: ServiceCalendarService,
              private shiftsService: ServiceShiftsService,
              private timesService: ServiceTimesService,
              private restaurantService:ServiceRestaurantService
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
      this.calendarService.nuevaFecha = this.date
      this.calendarService.nuevaFecha = this.date
      this.countSun = 0
      this.countMon = 0
      this.countTue = 0
      this.countWed = 0
      this.countThu = 0
      this.countFri = 0
      this.countSat = 0
      this.sun = null
      this.mon = null
      this.tue = null
      this.wed = null
      this.thu = null
      this.fri = null
      this.sat = null


    

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
  this.calendarService.changedDayName = this.changedDayName
  this.calendarService.changedMonth = this.changedMonth

  
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
    this.calendarService.times =[]
    let name = e.toString().substring(0,3)
    let month = e.toString().substr(4,3)
    let day = e.toString().substr(8,2)
    let year = e.toString().substr(11,4);
    this.date = new Calendar(name, day, month, year)
    this.selectDay = e;
    this.calendarService.nuevaFecha = this.date


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
            this.calendarService.times.push(time)                        
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

this.calendarService.changedDayName = this.changedDayName
this.calendarService.changedMonth = this.changedMonth

  }

public myDateFilter = (date:Date) => {

  const day = date.getDay();


  
      // if (this.calendarService.countSun == 0)  
      //   this.sun = 0
      // if (this.calendarService.countMon == 0)
      //   this.mon = 1
      // if (this.calendarService.countTue == 0)
      //   this.tue = 2
      // if (this.calendarService.countWed == 0)
      //   this.wed = 3
      // if (this.calendarService.countThu == 0)
      //   this.thu = 4
      // if (this.calendarService.countFri == 0)
      //   this.fri = 5
      // if (this.calendarService.countSat == 0)
      //   this.sat = 6

      return day != null;
        // return day !== 1 &&
        //        day !== 2
                // &&
              //  day !== this.tue && 
              //  day !== this.wed && 
              //  day !== this.thu && 
              //  day !== this.fri && 
              //  day !== this.sat;    
    
  

  }

}