import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-client-doReservation1',
  templateUrl: './do-reservation1.component.html',
  styleUrls: ['./do-reservation1.component.scss']
})
export class DoReservation1Component implements OnInit {
  public restaurantId = 27

  public personas:number;
  public ciudadElegida2: Date
  public turno:string;
  public today: string
  public selectedDayName:string
  public selectedDayNum:string
  public selectedMonth:string
  public selectedYear:string
  public changedDayName:string
  public changedMonth:string

  public calendarDayName:string
  public calendarDayNum:string
  public calendarMonth:string
  public calendarYear:string


  public tables: Tables[]
  public selectedTables: Tables[]
  public times: Times[]
  public shifts: Shifts[]
  public reservations: Reservations[]

  constructor(public router:Router,
              private reservationService: ServiceReservationsService,
              private timesService: ServiceTimesService,
              private shiftsService: ServiceShiftsService,
              private calendarService: ServiceCalendarService,
              private tablesService: ServiceTablesService,
              ) {

                // this.calendarDayName = this.calendarService.nuevaFecha.dayName
                // this.calendarDayNum = this.calendarService.nuevaFecha.dayNum
                // this.calendarMonth = this.calendarService.nuevaFecha.month
                // this.calendarYear = this.calendarService.nuevaFecha.year
            
                this.personas=0;
                this.turno=null;
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
                                  
                  console.log(this.calendarService.getDate());
                  for(let i = 0; i < dataTimes.data.length; i++){   
                                     
                    if(dataTimes.data[i].name == this.selectedDayName || dataTimes.data[i].name == this.calendarDayName){
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
                        console.log(this.times);
                        
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


   }

  //  FIN DEL CONSTRUCTOR

  ngOnInit() { 

 }

 //ESTA FUNCION HACE QUE SE CAMBIE EL CLICK DEL BOTON EN ROJO SOLO DEJANDO UNO EN ROJO
 // EN this.personas ESTOY GUARDANDO EL NUMERO DE PERSONAS QUE QUIEREN RESERVAR
 elegirpax(event){
  
  this.personas=event.target.value;
  console.log(this.personas);
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
}
 public eleccionCiudad(paramsCiudad:Date){
  this.ciudadElegida2 = paramsCiudad
}
}
