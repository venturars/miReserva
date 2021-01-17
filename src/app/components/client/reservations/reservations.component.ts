import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reservations } from 'src/app/models/reservations';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { ServiceReservationsService } from 'src/app/shared/service-reservations.service';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';
import { RejectReservationClientComponent } from '../../modals/modal-rejectReservationClient/modal-rejectReservationClient';
import { Restaurants } from '../../../models/restaurants';

@Component({
  selector: 'app-client-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsClientComponent implements OnInit {
public reservations:Reservations[]
public customerId:number
public changedMonth:string
public changedDayName:string
public restaurantsReservated: Restaurants[]=[];
public elSelect:string="Todas";
  constructor(public dialog: MatDialog,
              private loginService: ServiceLoginService,
              private reservationService: ServiceReservationsService,
              private restaurantService: ServiceRestaurantService
              ) {
    this.customerId = this.loginService.userCustomer.customer_id
    this.reservations = []
    
    this.reservationService.getReservationClient(this.customerId).subscribe((data:any) =>{     
      for(let i = 0; i < data.data.length; i++){
        this.restaurantService.getRestaurant(data.data[i].restaurant_id).subscribe((data2:any) =>{     
          let reservation:Reservations
          console.log(data2.data[0]);
          this.restaurantsReservated.push(data2.data[0])
          
          console.log(this.restaurantsReservated);
          this.reservationService.reservation = data.data[i]
          switch (data.data[i].dayname){
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
          switch (data.data[i].month){
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
          reservation.restaurantName = data2.data[0].name
          reservation.changedDayName = this.changedDayName
          reservation.changedMonth = this.changedMonth

        this.reservations.push(reservation)

        })
      }
    })
    console.log(this.reservations);
   }
  ngOnInit(): void {
  }
  
  public deleteReservation(id_reservation:number){
    let resultado =""
    console.log(id_reservation);
    
    
    for(let i = 0; i < this.reservations.length; i++){
      if(this.reservations[i].reservation_id == id_reservation){
        this.reservations.splice(i,1)
        resultado = "si"
      }else{
        resultado = "no"
      }
    }
    return resultado
  }

  openDialog(asd) {
    console.log(asd);
    this.reservationService.reservationId = asd    
    
    const dialogRef = this.dialog.open(RejectReservationClientComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

   
  }
  cambiarSelect(estado){
    console.log(estado.value)
    this.elSelect=estado.value;
  }

}
