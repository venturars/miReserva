import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { data } from 'jquery';
import { Reservations } from 'src/app/models/reservations';
import { Shifts } from 'src/app/models/shifts';
import { Tables } from 'src/app/models/tables';
import { Times } from 'src/app/models/times';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';
import { ServiceReservationsService } from 'src/app/shared/service-reservations.service';
import { ServiceShiftsService } from 'src/app/shared/service-shifts.service';
import { ServiceTablesService } from 'src/app/shared/service-tables.service';
import { ServiceTimesService } from 'src/app/shared/service-times.service';
import { CalendarComponent } from '../../calendar/calendar.component';

@Component({
  selector: 'app-modal-reserva-manual',
  templateUrl: './modal-reserva-manual.component.html',
  styleUrls: ['./modal-reserva-manual.component.scss']
})
export class ModalReservaManualComponent implements OnInit {
  public restaurantId = 27
  public showHide= false;
  public showHide2= true;
  public today: string
  public selectedDayName:string
  public selectedDayNum:string
  public selectedMonth:string
  public selectedYear:string
  public changedDayName:string
  public changedMonth:string


  public tables: Tables[]
  public selectedTables: Tables[]
  public times: Times[]
  public shifts: Shifts[]
  public reservations: Reservations[]
  public timesId:number

  public selectedTime:string
  public selectedShift:number
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
              private calendarService: ServiceCalendarService,
              private tablesService: ServiceTablesService,
              // private reservationService: ServiceReservationsService,
              ) {
                this.tables = []
                this.shifts = []
                this.times = []
                this.reservations = []
                this.selectedTables = []

                this.reservationService.getReservationRestaurant(this.restaurantId).subscribe((data:any) =>{     
                  for(let i = 0; i<data.data.length;i++){
        
                    if (data.data[i].status == "Reservada"){            
                      this.shiftsService.getShiftsId(data.data[i].shift_id).subscribe((data3:any) =>{  
                        
                      this.timesService.getTimesId(data3.data[0].times_id).subscribe((data4:any) =>{    
            
                      let reservation ={reservation_id:data.data[i].reservation_id,
                        customer_id:data.data[i].customer_id,
                        restaurant_id:data.data[i].restaurant_id,
                        table_id:data.data[i].table_id,
                        pax:data.data[i].pax,
                        day_name:data.data[i].day_name,
                        day:data.data[i].day,
                        month:data.data[i].month,
                        year:data.data[i].year,
                        hour:data.data[i].hour,
                        shift_id:data.data[i].shift_id,
                        comments:data.data[i].comments,
                        status:data.data[i].status,
                        customer_name:data.data[i].customer_name,
                        customer_phone:data.data[i].customer_phone,
                        service:data4.data[0].service}
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
                      this.shiftsService.getShiftsTimes(dataTimes.data[i].times_id).subscribe((dataShifts:any) =>{   
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


        this.today = Date();
        let currentDayName = this.today.substring(0,3);
        let currentDayNum = this.today.substring(8,10);
        let currentMonth = this.today.substring(4,7);
        let currentYear = this.today.substring(11,16);
    
        this.selectedDayNum = currentDayNum
        this.selectedDayName = currentDayName
        this.selectedMonth = currentMonth
        this.selectedYear = currentYear

        switch (this.selectedDayName){
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
        switch (this.selectedMonth){
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

    
   }

  //  FIN DEL CONSTRUCTOR

  ngOnInit(): void {
  }

  public asd(asd:any){
    this.timesId = asd   
  }

  public asdd(asd:number){
    for (let i = 0; i < this.reservations.length; i++){
      console.log(this.reservations);
      
      if(this.reservations[i].day == this.selectedDayNum &&
        this.reservations[i].day_name == this.selectedDayName && 
        this.reservations[i].month == this.selectedMonth && 
        this.reservations[i].year == this.selectedYear && 
        this.reservations[i].shift_id == this.selectedShift){
          this.selectedTables = []
          console.log(this.reservations[i]);
          
          for (let j = 0; j < this.tables.length; j++){
            if(this.tables[j].table_id != this.reservations[i].table_id){
              this.selectedTables.push(this.tables[j])
            }
            console.log(this.selectedTables);
          }
        }
        else{
          this.selectedTables = []

          for (let j = 0; j < this.tables.length; j++){
              this.selectedTables.push(this.tables[j])
            console.log(this.selectedTables);
          }
        }
    }
  }
  public confirmar(){
    this.showHide = true
    this.showHide2 = false
    for(let i = 0; i < this.shifts.length;i++){
      if (this.shifts[i].shift_id == this.selectedShift){
        this.selectedShiftHour = this.shifts[i].shift_from
      }
    }
    console.log(this.selectedShift);
    console.log(this.selectedShiftHour);
    
    this.selectedFullName = this.selectedName + " " + this.selectedSurname

    let reservation = new Reservations(0,
                                       1,
                                       this.restaurantId, 
                                       this.selectedTable, 
                                       this.selectedPax, 
                                       this.selectedDayName, 
                                       this.selectedDayNum, 
                                       this.selectedMonth, 
                                       this.selectedYear, 
                                       this.selectedShiftHour, 
                                       this.selectedShift,
                                       this.selectedComments,
                                       "Reservada", 
                                       this.selectedFullName, 
                                       this.selectedPhone)    

  this.reservationService.postReservation(reservation).subscribe((data:any) =>{

  })                   

  }

  public calendar(){
    const dialogRef = this.dialog.open(CalendarComponent);
    this.shifts = []
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.calendarService.nuevaFecha);  
      this.selectedDayName = this.calendarService.nuevaFecha.dayName
      this.selectedDayNum = this.calendarService.nuevaFecha.dayNum
      this.selectedMonth = this.calendarService.nuevaFecha.month
      this.selectedYear = this.calendarService.nuevaFecha.year
      this.changedDayName = this.selectedDayName
      this.changedMonth = this.selectedMonth
      switch (this.selectedDayName){
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
      switch (this.selectedMonth){
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

      for (let i = 0; i < this.reservations.length; i++){
        if(this.reservations[i].day == this.selectedDayNum &&
          this.reservations[i].day_name == this.selectedDayName && 
          this.reservations[i].month == this.selectedMonth && 
          this.reservations[i].year == this.selectedYear && 
          this.reservations[i].shift_id == this.selectedShift){
            for (let j = 0; j < this.tables.length; j++){
              if(this.tables[j].table_id != this.reservations[i].table_id){
                this.selectedTables.push(this.tables[j])
              }
              console.log(this.selectedTables);
            }
          }
      }
      this.timesService.getTimes(this.restaurantId).subscribe((dataTimes:any) =>{     
        this.times = []               
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
            this.shiftsService.getShiftsTimes(dataTimes.data[i].times_id).subscribe((dataShifts:any) =>{
                 
              for(let i = 0; i < dataShifts.data.length; i++){

                let shift = new Shifts (dataShifts.data[i].shift_id,
                  dataShifts.data[i].day,
                  dataShifts.data[i].shift_from,
                  dataShifts.data[i].shift_to,
                  dataShifts.data[i].restaurant_id,
                  dataShifts.data[i].times_id,
                  dataShifts.data[i].pax);
                  this.shifts.push(shift)
                  console.log(this.shifts);
                  
                }    
              })
          this.times.push(time)
        }}}   
      })
    });
  }


}
