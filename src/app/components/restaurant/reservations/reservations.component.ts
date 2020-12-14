import { Component, OnInit } from '@angular/core';
import { ReservationsRestaurants } from 'src/app/models/reservations-restaurants';

@Component({
  selector: 'app-restaurant-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsRestaurantComponent implements OnInit {
  public reservations:ReservationsRestaurants[]

  constructor() {
    this.reservations = [
      {id_reservation: 1,time:24,name:"Ventu",obs:"hola1",pax:4,table:1,status:"yes",id_restaurant:8},
      {id_reservation: 2,time:23,name:"Carolly",obs:"hola2",pax:3,table:2,status:"no",id_restaurant:6},
      {id_reservation: 3,time:21,name:"Jesus",obs:"hola3",pax:2,table:3,status:"yes",id_restaurant:4},
      {id_reservation: 4,time:20,name:"Juan",obs:"hola4",pax:1,table:4,status:"yes",id_restaurant:2}
    ]

   }

  ngOnInit(): void {
  }


  public confirmReservation(id_reservation:number){
    let resultado =""
    for(let i = 0; i < this.reservations.length; i++){
      if(this.reservations[i].id_reservation == id_reservation){
        this.reservations[i].status = "yes"
        resultado = "si"
      }else{
        resultado = "no"
      }
    }
    return resultado
  }

  

  public rejectReservation(id_reservation:number){
    let resultado =""
    for(let i = 0; i < this.reservations.length; i++){
      if(this.reservations[i].id_reservation == id_reservation){
        this.reservations.splice(i,1)
        resultado = "si"
      }else{
        resultado = "no"
      }
    }
    return resultado
  }

}
