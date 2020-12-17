import { EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    public minDate;
    public maxDate;
    public asd:Date
  @Output() ciudadElegida = new EventEmitter<Date>();

  @ViewChild('calendar') calendar: MatCalendar<Moment>;
  public selectedDate: Moment;

  constructor() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear,currentMonth,currentDay);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.ciudadElegida.emit(this.asd)
    console.log(this.asd+"asd");

  
   }

  ngOnInit(): void {
  }
  
  public getChangedValue(e)  {
    console.log(e); // this is always "undefined"
    let nombre = e.toString().substring(0,3)
    let mes = e.toString().substr(4,3)
    let dia = e.toString().substr(8,2)
    let anyo = e.toString().substr(11,4);
    console.log(nombre);
    console.log(dia);
    console.log(mes);
    console.log(anyo);
    this.asd = e
  }

  myDateFilter = (date: Date) => {
    const day = date.getDay();
    const date2 = date.getDate();

    let special = new Date('Fri Dec 25 2020').getDate();
    // Prevent Saturday and Sunday from being selected.
   
      return day !== 0 && day !== 6 && date2 !== special ;
  }

}