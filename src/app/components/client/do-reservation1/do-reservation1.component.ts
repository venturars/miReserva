import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservations } from 'src/app/models/reservations';
import { Shifts } from 'src/app/models/shifts';
import { Tables } from 'src/app/models/tables';
import { Times } from 'src/app/models/times';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';
import { ServiceReservationsService } from 'src/app/shared/service-reservations.service';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';
import { ServiceShiftsService } from 'src/app/shared/service-shifts.service';
import { ServiceTablesService } from 'src/app/shared/service-tables.service';
import { ServiceTimesService } from 'src/app/shared/service-times.service';

@Component({
  selector: 'app-client-doReservation1',
  templateUrl: './do-reservation1.component.html',
  styleUrls: ['./do-reservation1.component.scss']
})
export class DoReservation1Component implements OnInit {

  public restaurantId = this.restaurantService.restaurantReservation.restaurant_id
  public personas:any = 0;
  public ciudadElegida2: Date;
  public turno:string = null;
  public today: string = Date();
  public selectedDayName:string;
  public selectedDayNum:string;
  public selectedMonth:string;
  public selectedYear:string;
  public changedDayName:string;
  public changedMonth:string;
  public pax:number = 0;
  public tableId:number = 0;
  public tables:Tables[] = new Array();
  public selectedTables:Tables[] = new Array();
  public availableTables:Tables[] = new Array();
  public times:Times[] = new Array();
  public shifts:Shifts[] = new Array();
  public selectedShifts:Shifts[] = new Array();
  public availableShifts:Shifts[] = new Array();
  public reservations: Reservations[] = new Array();
  public reservations2: Reservations[] = new Array();

  constructor(
    public router:Router,
    private reservationService: ServiceReservationsService,
    private timesService: ServiceTimesService,
    private shiftsService: ServiceShiftsService,
    public calendarService: ServiceCalendarService,
    private tablesService: ServiceTablesService,
    public restaurantService: ServiceRestaurantService
  ) {
    this.reservationService.getReservationRestaurant(this.restaurantId).subscribe((response:any) => {
      for(let i = 0; i <response.data.length; i++) {
          if (response.data[i].status == "Reservada") {
            this.shiftsService.getShiftsId(response.data[i].shift_id).subscribe((data3:any) =>{  
              this.timesService.getTimesId(data3.data[0].times_id).subscribe((data4:any) =>{    
              let reservation:Reservations = new Reservations(
                response.data[i].reservation_id,
                response.data[i].customer_id,
                response.data[i].restaurant_id,
                response.data[i].table_id,
                response.data[i].pax,
                response.data[i].day_name,
                response.data[i].day,
                response.data[i].month,
                response.data[i].year,
                response.data[i].hour,
                response.data[i].shift_id,
                response.data[i].comments,
                response.data[i].status,
                response.data[i].customer_name,
                response.data[i].customer_phone
              );
              reservation.service = data4.data[0].service;
              this.reservations.push(reservation);
    });});}}});
    this.tablesService.getTables(this.restaurantId).subscribe((dataTables:any) => {
      for(let i = 0; i < dataTables.data.length; i++) {
        let table = new Tables (
          dataTables.data[i].table_id,
          dataTables.data[i].table_name,
          dataTables.data[i].table_max,
          dataTables.data[i].table_min,
          dataTables.data[i].restaurant_id
        );
        this.tables.push(table)
    }});
    this.shiftsService.getShifts(this.restaurantId).subscribe((dataShifts:any) => {
      for(let i = 0; i < dataShifts.data.length; i++) {
        let shift = new Shifts (dataShifts.data[i].shift_id,
        dataShifts.data[i].day,
        dataShifts.data[i].shift_from,
        dataShifts.data[i].shift_to,
        dataShifts.data[i].restaurant_id,
        dataShifts.data[i].times_id,
        dataShifts.data[i].pax
        );
        this.shifts.push(shift);
    }});
    this.selectedDayNum = this.today.substring(8,10);
    this.selectedDayName = this.today.substring(0,3);
    this.selectedMonth = this.today.substring(4,7);
    this.selectedYear = this.today.substring(11,16);
    }
    ngOnInit() { 
    }
    public elegirpax(event) {
    this.personas=event.target.value;
    const elgrupo:any=document.getElementById("elgrupo");
    if(this.personas < 7) {
      elgrupo.value="";
  }}
  public pass() {
    const mensajerror=document.getElementById("mensajerror");
    mensajerror.innerHTML="";
    const turnos:any=document.getElementById("turnos")
    this.turno=turnos.value; 
    if (this.personas==0) {
      const mensajerror=document.getElementById("mensajerror");
      mensajerror.innerHTML="Elige número de comensales";
    }
    if (this.turno=="Elige turno"){
      const mensajerror=document.getElementById("mensajerror");
      mensajerror.innerHTML +="<br>Elige turno de comida"
    }
    if (this.personas!=0 && this.turno!="Elige turno"){
      this.router.navigate(['/reservation2'])
    }
    this.reservationService.dayName = this.calendarService.getNewDate().dayName
    this.reservationService.dayNum = this.calendarService.getNewDate().dayNum
    this.reservationService.month = this.calendarService.getNewDate().month
    this.reservationService.year = this.calendarService.getNewDate().year
    this.reservationService.time = turnos.value
    this.reservationService.pax = this.personas
    for(let i = 0; i < this.shifts.length;i++) {
      if (this.shifts[i].times_id == turnos.value) {
        this.selectedShifts.push(this.shifts[i])
    }}
    for(let i = 0; i < this.selectedShifts.length;i++) {
      this.reservationService.getReservationPax(this.selectedShifts[i].shift_id,
      this.calendarService.getNewDate().dayName,
      this.calendarService.getNewDate().dayNum,
      this.calendarService.getNewDate().month,
      this.calendarService.getNewDate().year
      ).subscribe((data:any) =>{ 
        
        let totalPax = data.data[0].pax + parseInt(this.personas);
        console.log(this.selectedShifts[i].pax);
        console.log('Comprobar el if');
        
        if(this.selectedShifts[i].pax >= totalPax) {
          this.availableShifts.push(this.selectedShifts[i])        
    }});}
    this.reservationService.reservations = this.reservations
    this.reservationService.times = this.times
    this.reservationService.shifts = this.availableShifts
    
    
}}