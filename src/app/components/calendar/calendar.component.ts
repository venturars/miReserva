import { EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { Calendar } from 'src/app/models/calendar';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    public minDate:Date;
    public maxDate:Date;
    public selectDay:Date;
    public date:Calendar

  @ViewChild('calendar') calendar: MatCalendar<Moment>;
  public selectedDate: Moment;
  constructor(private calendarService: ServiceCalendarService) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear,currentMonth,currentDay);
    this.maxDate = new Date(currentYear + 1, 11, 31);
   }

  ngOnInit(): void {
  }
  
  public getChangedValue(e:Date)  {
    console.log(e);
    let name = e.toString().substring(0,3)
    let month = e.toString().substr(4,3)
    let day = e.toString().substr(8,2)
    let year = e.toString().substr(11,4);
    this.date = new Calendar(name, day, month, year)
    this.selectDay = e;
    this.calendarService.nuevaFecha = this.date
    
    // this.calendarService.newDate(this.date).subscribe((data:any) =>{ 
    //   console.log("asd");
    // })
  }

  myDateFilter = (date:Date) => {
    const day = date.getDay();
    const date2 = date.getDate();

    let special = new Date('2021/01/25').getDate();
    // Prevent Saturday and Sunday from being selected.
   
      return day !== 0 && day !== 6 && date2 !== special ;
  }

}