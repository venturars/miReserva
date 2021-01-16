import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { ModalReservaComponent } from '../../modals/modal-reserva/modal-reserva.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-doReservation2',
  templateUrl: './do-reservation2.component.html',
  styleUrls: ['./do-reservation2.component.scss']
})
export class DoReservation2Component implements OnInit {
  public restaurantId = this.restaurantService.restaurantReservation.restaurant_id
  public today: string
  public selectedDayName:string
  public selectedDayNum:string
  public selectedMonth:string
  public selectedYear:string
  public changedDayName:string
  public changedMonth:string


  public tables: Tables[]
  public selectedTables: Tables[]
  public availableTables: Tables[]
  public times: Times[]
  public shifts: Shifts[]
  public availableShifts: Shifts[]
  public reservations: Reservations[]
  public reservations2: Reservations[]
  public availableReservations: Reservations[]

  public timesId:number
  public selectedShiftId:number

  public selectedTime:string
  public selectedShiftHour:string
  public selectedName:string
  public selectedSurname:string
  public selectedPhone:number
  public selectedPax:number
  public selectedTable:number
  public selectedComments:string
  public selectedFullName:string

  constructor(public dialog: MatDialog,
    private reservationService: ServiceReservationsService,
    private timesService: ServiceTimesService,
    private shiftsService: ServiceShiftsService,
    public calendarService: ServiceCalendarService,
    private tablesService: ServiceTablesService,
    private restaurantService:ServiceRestaurantService,
    private router:Router
    ) {
  this.tables = []
  this.shifts = []
  this.times = []
  this.reservations = []
  this.reservations2 = []
  this.selectedTables = []
  this.availableShifts = this.reservationService.shifts
  this.availableReservations = []
  this.availableTables =[]

  this.reservationService.getReservationRestaurant(this.restaurantId).subscribe((data:any) =>{     
    for(let i = 0; i<data.data.length;i++){

      if (data.data[i].status == "Reservada"){            
        this.shiftsService.getShiftsId(data.data[i].shift_id).subscribe((data3:any) =>{  
          
        this.timesService.getTimesId(data3.data[0].times_id).subscribe((data4:any) =>{    
          let reservation:Reservations
          reservation = new Reservations(data.data[i].reservation_id,
          data.data[i].customer_id,
          data.data[i].restaurant_id,
          data.data[i].table_id,
          data.data[i].pax,
          data.data[i].day_name,
          data.data[i].day,
          data.data[i].month,
          data.data[i].year,
          data.data[i].hour,
          data.data[i].shift_id,
          data.data[i].comments,
          data.data[i].status,
          data.data[i].customer_name,
          data.data[i].customer_phone)
          reservation.service = data4.data[0].service
        this.reservations.push(reservation)
        
        }) 
        }) 
      }
    }


  })

  this.timesService.getTimes(this.restaurantId).subscribe((dataTimes:any) =>{                    
    for(let i = 0; i < dataTimes.data.length; i++){
      if(dataTimes.data[i].name == this.selectedDayName){
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
        }}}   
  })
  this.tablesService.getTables(this.restaurantId).subscribe((dataTables:any) =>{                   
    for(let i = 0; i < dataTables.data.length; i++){
      let table = new Tables (dataTables.data[i].table_id,
        dataTables.data[i].table_name,
        dataTables.data[i].table_max,
        dataTables.data[i].table_min,
        dataTables.data[i].restaurant_id)
      this.tables.push(table)
    }                      
  })
  this.selectedDayNum = this.calendarService.nuevaFecha.dayNum
  this.selectedDayName = this.calendarService.nuevaFecha.dayName
  this.selectedMonth = this.calendarService.nuevaFecha.month
  this.selectedYear = this.calendarService.nuevaFecha.year


}

  ngOnInit(): void {
  
  }

  public shiftId(shift_id:number){
    this.reservationService.tableId = 0
    this.selectedShiftId = shift_id
    this.reservationService.shiftId = shift_id

    if (this.reservations.length != 0){
      for (let i = 0; i < this.reservations.length; i++){
        // this.selectedTables = []
        
        if(this.reservations[i].day == this.selectedDayNum &&
          this.reservations[i].day_name == this.selectedDayName && 
          this.reservations[i].month == this.selectedMonth && 
          this.reservations[i].year == this.selectedYear && 
          this.reservations[i].shift_id == shift_id){
          
          this.reservations2.push(this.reservations[i])     
               
        }

      }
      for (let j = 0; j < this.tables.length; j++){
        let i = 0;
        let reservada=false
        while(i < this.reservations2.length && !reservada){
            reservada=(this.reservations2[i].table_id == this.tables[j].table_id)
            
            i++}
        if(!reservada)
          this.availableTables.push(this.tables[j])
        }
        console.log(this.availableTables);
        
        
        for(let i = 0; i < this.availableTables.length; i++){
          if(this.availableTables[i].table_max >= this.reservationService.pax && this.availableTables[i].table_min <= this.reservationService.pax ){
            this.reservationService.tableId = this.availableTables[i].table_id
            i = this.availableTables.length + 1;
          }else{
            this.reservationService.tableId = 0
          }
        }

    }

console.log(this.reservationService.tableId);

  }

  openDialog() {
    const obs:any=document.getElementById("obs");
    this.reservationService.obs = obs.value

    const dialogRef = this.dialog.open(ModalReservaComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["/reservations-list-client"]);      
    });
  }
}
