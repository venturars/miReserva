import { Component, OnInit } from '@angular/core';
import { Reservations } from 'src/app/models/reservations';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';
import { ReservationsRestaurantComponent } from '../../restaurant/reservations/reservations.component';

@Component({
  selector: 'app-modal-restaurante',
  templateUrl: './modal-restaurante.component.html',
  styleUrls: ['./modal-restaurante.component.scss']
})
export class ModalRestauranteComponent implements OnInit {
  public data:Reservations
  constructor(private reservation:ServiceCalendarService) {
    this.data = reservation.reserva
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


}
