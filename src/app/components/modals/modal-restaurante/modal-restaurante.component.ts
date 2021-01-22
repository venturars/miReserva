import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reservations } from 'src/app/models/reservations';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { ServiceReservationsService } from 'src/app/shared/service-reservations.service';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';
import { ReservationsRestaurantComponent } from '../../restaurant/reservations/reservations.component';

@Component({
  selector: 'app-modal-restaurante',
  templateUrl: './modal-restaurante.component.html',
  styleUrls: ['./modal-restaurante.component.scss']
})
export class ModalRestauranteComponent implements OnInit {
  public data:Reservations
  public month:string
  constructor(private reservation:ServiceCalendarService, 
              public restaurantService:ServiceRestaurantService,
              public reservationService:ServiceReservationsService,
              public loginService:ServiceLoginService,
              public matDialog:MatDialog) {
    console.log(reservation.reserva);
    console.log(this.reservation.reserva);
    this.data = reservation.reserva
    this.month=this.data.month;
    switch (reservation.reserva.day_name){
      case "Sun":
        this.data.day_name = "Domingo";
        break;
      case "Mon":
        this.data.day_name = "Lunes";
        break;
      case "Tue":
        this.data.day_name = "Martes";
        break;
      case "Wed":
        this.data.day_name = "Miercoles";
        break;
      case "Thu":
        this.data.day_name = "Jueves";
        break;
      case "Fri":
        this.data.day_name = "Viernes";
        break;
      case "Sat":
        this.data.day_name = "Sabado";
        break;        
    }
    switch (reservation.reserva.month){
      case "Jan":
        this.data.month = "Enero";
        break;
      case "Feb":
        this.data.month = "Febrero";
        break;
      case "Mar":
        this.data.month = "Marzo";
        break;
      case "Apr":
        this.data.month = "Abril";
        break;
      case "May":
        this.data.month = "Mayo";
        break;
      case "Jun":
        this.data.month = "Junio";
        break;
      case "Jul":
        this.data.month = "Julio";
        break;        
      case "Aug":
        this.data.month = "Agosto";
        break;
      case "Sep":
        this.data.month = "Septiembre";
        break;
      case "Oct":
        this.data.month = "Octubre";
        break;
      case "Nov":
        this.data.month = "Noviembre";
        break;
      case "Dic":
        this.data.month = "Diciembre";
        break;        
    }

  }

  ngOnInit(): void {
  }
changeRes(cambiorestado){
  this.data.month=this.month;
  this.data.status=cambiorestado;
  this.reservationService.putReservation(this.data)
  .subscribe((data)=> {console.log(data)
   
  })
}

}
