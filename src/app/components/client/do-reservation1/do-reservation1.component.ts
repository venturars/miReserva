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

  public personas:number;
  public personas2:string
  public ciudadElegida2: Date
  public turno:string;
  public today: string
  public selectedDayName:string
  public selectedDayNum:string
  public selectedMonth:string
  public selectedYear:string
  public changedDayName:string
  public changedMonth:string
  public pax:number
  public tableId:number
  public hola:string

  public tables: Tables[]
  public selectedTables: Tables[]
  public availableTables:Tables[]
  public times: Times[]
  public shifts: Shifts[]
  public selectedShifts:Shifts[]
  public availableShifts:Shifts[]
  public reservations: Reservations[]
  public reservations2: Reservations[]


  constructor(public router:Router,
              private reservationService: ServiceReservationsService,
              private timesService: ServiceTimesService,
              private shiftsService: ServiceShiftsService,
              public calendarService: ServiceCalendarService,
              private tablesService: ServiceTablesService,
              private restaurantService: ServiceRestaurantService
              ) {            
                this.tableId=0
                this.personas=0;
                this.turno=null;
                this.tables = []
                this.shifts = []
                this.times = []
                this.reservations = []
                this.reservations2 = []
                this.selectedTables = []
                this.selectedShifts = []
                this.availableShifts = []
                this.availableTables = []
                this.pax = 0              


                
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

                  this.shiftsService.getShifts(this.restaurantId).subscribe((dataShifts:any) =>{   
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

                this.today = Date();
                let currentDayName = this.today.substring(0,3);
                let currentDayNum = this.today.substring(8,10);
                let currentMonth = this.today.substring(4,7);
                let currentYear = this.today.substring(11,16);
            
                this.selectedDayNum = currentDayNum
                this.selectedDayName = currentDayName
                this.selectedMonth = currentMonth
                this.selectedYear = currentYear


   }

  //  FIN DEL CONSTRUCTOR

  ngOnInit() { 

 }

 //ESTA FUNCION HACE QUE SE CAMBIE EL CLICK DEL BOTON EN ROJO SOLO DEJANDO UNO EN ROJO
 // EN this.personas ESTOY GUARDANDO EL NUMERO DE PERSONAS QUE QUIEREN RESERVAR
 elegirpax(event){
  
  this.personas=event.target.value;
  this.personas2=event.target.value;

  const todoslaspax:any=document.getElementsByClassName("numbers");
  for (let i=0;i<todoslaspax.length;i++){
    todoslaspax[i].style.background="var(--secundaryColor)";
    todoslaspax[i].style.color="black";
  }

  const elgrupo:any=document.getElementById("elgrupo");
  elgrupo.value="";
  elgrupo.style.background="var(--secundaryColor)";
  elgrupo.style.color="var(--secundaryColorContrast)";

  event.target.style.background="var(--secundaryColorContrast)";
  event.target.style.color="var(--secundaryColor)";
  
 }

 grupos(valor){
   
   this.personas=valor.target.value;
   console.log(this.personas);
   const todoslaspax:any=document.getElementsByClassName("numbers");
   for (let i=0;i<todoslaspax.length;i++){
    todoslaspax[i].style.background="var(--secundaryColor)";
    todoslaspax[i].style.color="black";
  }
  const elgrupo:any=document.getElementById("elgrupo");
  elgrupo.style.background="var(--secundaryColorContrast)";
  elgrupo.style.color="var(--secundaryColor)";

 }

 //HAY QUE AÑADIR LA VALIDACION DE QUE HAYA MARCADO UN DIA EN EL CALENDARIO, CUANDO YA ESTE EN SERVICIOS
 siguiente(){
  const mensajerror=document.getElementById("mensajerror");
  mensajerror.innerHTML="";
  const turnos:any=document.getElementById("turnos")
  this.turno=turnos.value; 
  if (this.personas==0){
    const mensajerror=document.getElementById("mensajerror");
    mensajerror.innerHTML="Elige número de comensales"
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

for(let i = 0; i < this.shifts.length;i++){
  
  if (this.shifts[i].times_id == turnos.value){
    this.selectedShifts.push(this.shifts[i])
  }
}

for(let i = 0; i < this.selectedShifts.length;i++){
  
  this.reservationService.getReservationPax(this.selectedShifts[i].shift_id,
    this.calendarService.getNewDate().dayName,
    this.calendarService.getNewDate().dayNum,
    this.calendarService.getNewDate().month,
    this.calendarService.getNewDate().year
    ).subscribe((data:any) =>{ 
      let pax:number
      pax = parseInt(this.personas2)
      
      let totalPax = data.data[0].pax + pax
      
      if(this.selectedShifts[i].pax >= totalPax){
        this.availableShifts.push(this.selectedShifts[i])        
      }
      })
}



this.reservationService.reservations = this.reservations
this.reservationService.times = this.times
this.reservationService.shifts = this.availableShifts

}





}