import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Calendar } from 'src/app/models/calendar';
import { Reservations } from 'src/app/models/reservations';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { ServiceReservationsService } from 'src/app/shared/service-reservations.service';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';
import { ServiceShiftsService } from 'src/app/shared/service-shifts.service';
import { ServiceTimesService } from 'src/app/shared/service-times.service';
import { ServiceUserCustomerService } from 'src/app/shared/service-user-customer.service';
import { CalendarComponent } from '../../calendar/calendar.component';
import { ModalReservaManualComponent } from '../../modals/modal-reserva-manual/modal-reserva-manual.component';
import { ModalRestauranteComponent } from '../../modals/modal-restaurante/modal-restaurante.component';

@Component({
  selector: 'app-restaurant-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsRestaurantComponent implements OnInit {
  public today:string
  public selectedDayName:string
  public selectedDayNum:string
  public selectedMonth:string
  public selectedYear:string
  public changedDayName:string
  public changedMonth:string

  public value:number=0;
  public service:string="0";
  public reservationsConfirmed:Reservations[]
  public reservationsRejected:Reservations[]
  public reservationsCanceledByClient:Reservations[]
  public reservationsToBeConfirmed:Reservations[]
  public showData:Reservations
  public dateOfBirth:string
  public reservation:Reservations

  public restaurantId:number

  constructor(public dialog: MatDialog,
              private reservationService: ServiceReservationsService,
              private customerService: ServiceUserCustomerService,
              private shiftsService: ServiceShiftsService,
              private timesService:ServiceTimesService,
              private calendarService:ServiceCalendarService,
              private loginService: ServiceLoginService,
              private restaurantService: ServiceRestaurantService) {

                if(this.loginService.users.restaurant_id != null){ 
                  this.restaurantId = this.loginService.restaurants.restaurant_id
                }else if(this.loginService.users.owner_id != null){  
                  this.restaurantId = this.restaurantService.selectedRestaurant.restaurant_id
                }

                this.reservationsConfirmed = []
                this.reservationsRejected = []
                this.reservationsCanceledByClient = []

    this.reservationService.getReservationRestaurant(this.restaurantId).subscribe((data:any) =>{     
    for(let i = 0; i<data.data.length;i++){
        
        if (data.data[i].status == "Reservada"){

          this.shiftsService.getShiftsId(data.data[i].shift_id).subscribe((data3:any) =>{  
            
          this.timesService.getTimesId(data3.data[0].times_id).subscribe((data4:any) =>{    

          this.reservation = new Reservations(data.data[i].reservation_id,
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
          this.reservation.service = data4.data[0].service
        this.reservationsConfirmed.push(this.reservation)

          }) 
          }) 
          
        }

      else if (data.data[i].status == "Rechazada"){        
        this.shiftsService.getShiftsId(data.data[i].shift_id).subscribe((data3:any) =>{  
            
        this.timesService.getTimesId(data3.data[0].times_id).subscribe((data4:any) =>{    
  
        this.reservation = new Reservations(data.data[i].reservation_id,
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
          this.reservation.service = data4.data[0].service
        this.reservationsRejected.push(this.reservation)

      }) 
      }) 

      }
    
    else if (data.data[i].status == "Cancelada por cliente"){
      this.shiftsService.getShiftsId(data.data[i].shift_id).subscribe((data3:any) =>{  
            
      this.timesService.getTimesId(data3.data[0].times_id).subscribe((data4:any) =>{    
  
        this.reservation = new Reservations(data.data[i].reservation_id,
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
          this.reservation.service = data4.data[0].service
        this.reservationsCanceledByClient.push(this.reservation)
    }) 
    }) 
    }

    else if (data.data[i].status == "Pendiente"){      
      this.shiftsService.getShiftsId(data.data[i].shift_id).subscribe((data3:any) =>{  
            
      this.timesService.getTimesId(data3.data[0].times_id).subscribe((data4:any) =>{    
    
        this.reservation = new Reservations(data.data[i].reservation_id,
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
          this.reservation.service = data4.data[0].service
        this.reservationsToBeConfirmed.push(this.reservation)
    }) 
    }) 
    }

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
  // FIN CONSTRUCTOR


  ngOnInit(): void {
 
  }

  public confirmReservation(id_reservation:number){

  }

  public rejectReservation(id_reservation:number){

  }

  public fecha() {
    let nombre = this.dateOfBirth.toString().substring(0,3)
    let mes = this.dateOfBirth.toString().substr(4,3)
    let dia = this.dateOfBirth.toString().substr(8,2)
    let anyo = this.dateOfBirth.toString().substr(11,4)
  }
  
  public modalStatus(data12:any) {
    console.log(data12);
    
    this.calendarService.reserva = data12
    const dialogRef = this.dialog.open(ModalRestauranteComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public modalNew() {
  const dialogRef = this.dialog.open(ModalReservaManualComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

public calendar(){
  const dialogRef = this.dialog.open(CalendarComponent);
  dialogRef.afterClosed().subscribe(result => {
    
    console.log(this.calendarService.nuevaFecha);  
    this.selectedDayName = this.calendarService.nuevaFecha.dayName
    this.selectedDayNum = this.calendarService.nuevaFecha.dayNum
    this.selectedMonth = this.calendarService.nuevaFecha.month
    this.selectedYear = this.calendarService.nuevaFecha.year

  });

}
}