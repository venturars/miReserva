import { Component, OnInit } from '@angular/core';
import { Reservations } from 'src/app/models/reservations';
import { Shifts } from 'src/app/models/shifts';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';
import { ServiceReservationsService } from 'src/app/shared/service-reservations.service';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';
import { ServiceShiftsService } from 'src/app/shared/service-shifts.service';
import { ServiceRouterService } from '../../../shared/service-router.service';

@Component({
  selector: 'app-modal-reserva',
  templateUrl: './modal-reserva.component.html',
  styleUrls: ['./modal-reserva.component.scss']
})
export class ModalReservaComponent implements OnInit {
public showHide:boolean
public showHideTables:boolean
public showHideConfirm:boolean

public restaurantId:number
public customerId:number

public selectedShiftId:number
public selectedPax:number
public selectedTable:number
public selectedComments:string
public selectedDayName:string
public selectedDayNum:string
public selectedMonth:string
public selectedYear:string
public selectedHour:string

public changedDayName:string
public changedMonth:string
public fullName:string

public shift:Shifts

  constructor(
    private reservationService: ServiceReservationsService,
    public calendarService: ServiceCalendarService,
    private restaurantService: ServiceRestaurantService,
    private shiftsService: ServiceShiftsService,
    private serviceRouter:ServiceRouterService
  ) {
    this.customerId = JSON.parse(localStorage.getItem('userCustomer')).customer_id
    this.selectedShiftId = this.reservationService.shiftId
    this.selectedPax = this.reservationService.pax
    this.selectedTable = this.reservationService.tableId
    if(this.reservationService.obs == "" || this.reservationService.obs == null){
      this.selectedComments = "Sin comentarios"
    }else{
      this.selectedComments = this.reservationService.obs
    }
    this.selectedDayName = this.calendarService.getNewDate().dayName
    this.selectedDayNum = this.calendarService.getNewDate().dayNum
    this.selectedMonth = this.calendarService.getNewDate().month
    this.selectedYear = this.calendarService.getNewDate().year
    this.restaurantId = this.restaurantService.restaurantReservation.restaurant_id
    console.log(this.restaurantId);
    this.fullName = JSON.parse(localStorage.getItem('userCustomer')).customer.name + " " + JSON.parse(localStorage.getItem('userCustomer')).surname
    this.shiftsService.getShiftsId(this.selectedShiftId).subscribe((data:any) =>{  
      this.shift = data.data[0]
      this.selectedHour =  data.data[0].shift_from      
      
    })

    if(this.reservationService.tableId == 0){
      this.showHideTables = true
    }else{
      this.showHide = true
    }
   }

  ngOnInit(): void {
  }

  public confirmar(){
    if(this.selectedPax >= 7){
    let reservation = new Reservations(0,
      1,
      this.restaurantId, 
      this.selectedTable, 
      this.selectedPax, 
      this.selectedDayName, 
      this.selectedDayNum, 
      this.selectedMonth, 
      this.selectedYear, 
      this.selectedHour, 
      this.selectedShiftId,
      this.selectedComments,
      "Pendiente", 
      this.fullName, 
      JSON.parse(localStorage.getItem('userCustomer')).phone
    );

this.reservationService.postReservation(reservation).subscribe((data:any) =>{
console.log(data);
    this.serviceRouter.routerClient(1);
})
    }else{
      let reservation = new Reservations(null,
        this.customerId,
        this.restaurantId, 
        this.selectedTable, 
        this.selectedPax, 
        this.selectedDayName, 
        this.selectedDayNum, 
        this.selectedMonth, 
        this.selectedYear, 
        this.selectedHour, 
        this.selectedShiftId,
        this.selectedComments,
        "Reservada", 
        this.fullName, 
        JSON.parse(localStorage.getItem('userCustomer')).phone
      )    
  this.reservationService.postReservation(reservation).subscribe((data:any) =>{
    this.serviceRouter.routerClient(1);
  })
    }
  }
}
