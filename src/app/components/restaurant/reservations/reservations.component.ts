import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reservations } from 'src/app/models/reservations';
import { ReservationsRestaurants } from 'src/app/models/reservations-restaurants';
import { UserCustomer } from 'src/app/models/user-customer';
import { ServiceReservationsService } from 'src/app/shared/service-reservations.service';
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
  public minDate: Date;
  public maxDate: Date;
  public value:number
  public reservationsConfirmed:Reservations[]
  public reservationsRejected:Reservations[]
  public reservationsCanceledByClient:Reservations[]
  public dateOfBirth:string
  public reservation:Reservations
  public customers

// hace que el calendario no muestre un dia en particular
// 0:domingo ..... 6:sabado
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 1
  }
  
  constructor(public dialog: MatDialog, private apiService: ServiceReservationsService, private apiService2: ServiceUserCustomerService) {
    this.reservationsConfirmed = []
    this.reservationsRejected = []
    this.reservationsCanceledByClient = []
    this.customers =[]

    this.apiService.getReservationRestaurant(27).subscribe((data:any) =>{     
      for(let i = 0; i<data.data.length;i++){
        if (data.data[i].status == "Reservada"){
          this.reservation ={reservation_id:data.data[i].reservation_id,
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
            status:data.data[i].status}
          this.reservationsConfirmed.push(this.reservation)
        }
      for (let j = 0; j < this.reservationsConfirmed.length; j++) {
        this.apiService2.getCustomer(this.reservationsConfirmed[j].customer_id).subscribe((data2:any) =>{  
          this.customers.push(data2.data[0].name)          
        }) 
      }

      if (data.data[i].status == "Rechazada"){
        this.reservation ={reservation_id:data.data[i].reservation_id,
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
          status:data.data[i].status}
        this.reservationsRejected.push(this.reservation)
      }
    for (let j = 0; j < this.reservationsRejected.length; j++) {
      this.apiService2.getCustomer(this.reservationsRejected[j].customer_id).subscribe((data2:any) =>{  
        this.customers.push(data2.data[0].name)          
      }) 
    }

    
    if (data.data[i].status == "Cancelada por cliente"){
      this.reservation ={reservation_id:data.data[i].reservation_id,
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
        status:data.data[i].status}
      this.reservationsCanceledByClient.push(this.reservation)
    }
    for (let j = 0; j < this.reservationsCanceledByClient.length; j++) {
      this.apiService2.getCustomer(this.reservationsCanceledByClient[j].customer_id).subscribe((data2:any) =>{  
        this.customers.push(data2.data[0].name)          
      }) 
    }

  }
    
    })     
  
// el calendario bloquea desde el dia anterior
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    this.minDate = new Date(currentYear,currentMonth,currentDay);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    console.log(currentYear);
    console.log(currentMonth);
    console.log(currentDay);
  }


  ngOnInit(): void {
 
  }


  public confirmReservation(id_reservation:number){

  }

  public rejectReservation(id_reservation:number){

  }

  public fecha() {
    console.log(this.dateOfBirth);
    let nombre = this.dateOfBirth.toString().substring(0,3)
    let mes = this.dateOfBirth.toString().substr(4,3)
    let dia = this.dateOfBirth.toString().substr(8,2)
    let anyo = this.dateOfBirth.toString().substr(11,4)
    console.log(nombre);
    console.log(dia);
    console.log(mes);
    console.log(anyo);

  }
  
  public modalStatus() {
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
    console.log(`Dialog result: ${result}`);
  });

}

}

