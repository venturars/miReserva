import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationsRestaurants } from 'src/app/models/reservations-restaurants';
import { ModalRestauranteComponent } from '../../modals/modal-restaurante/modal-restaurante.component';

@Component({
  selector: 'app-restaurant-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsRestaurantComponent implements OnInit {

  public minDate: Date;
  public maxDate: Date;
  public reservations:ReservationsRestaurants[]
  public reservationsYes:ReservationsRestaurants[]
  public reservationsNo:ReservationsRestaurants[]
  public dateOfBirth:string

// hace que el calendario no muestre un dia en particular
// 0:domingo ..... 6:sabado
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 1
  }

  constructor(public dialog: MatDialog) {
    this.reservationsYes = []
    this.reservationsNo = []
    this.reservations = [
      {id_reservation: 1,time:24,name:"Ventuasdasdasdasdasdasdasdasd",obs:"HOla, queria saber si me pueden poner en una mesa linda, que es mic",pax:4,table:1,status:"yes",id_restaurant:8},
      {id_reservation: 2,time:23,name:"Carolly",obs:"hola2",pax:3,table:2,status:"no",id_restaurant:6},
      {id_reservation: 3,time:21,name:"Jesus",obs:"hola3",pax:2,table:3,status:"no",id_restaurant:4},
      {id_reservation: 4,time:20,name:"Juan",obs:"hola4",pax:1,table:4,status:"yes",id_restaurant:2}
    ]

    for (let i = 0; i < this.reservations.length; i++){
      if(this.reservations[i].status == "yes"){
        this.reservationsYes.push(this.reservations[i]);
      }else{
        this.reservationsNo.push(this.reservations[i]);
      }
    }
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
    let resultado =""
    for(let i = 0; i < this.reservationsNo.length; i++){
      if(this.reservationsNo[i].id_reservation == id_reservation){
        this.reservationsYes.push(this.reservationsNo[i])
        this.reservationsNo.splice(i,1)
        this.reservationsNo[i].status = "no"
        resultado = "si"
      }else{
        resultado = "no"
      }
    }
    return resultado
  }

  public rejectReservation(id_reservation:number){
    let resultado =""
    for(let i = 0; i < this.reservationsNo.length; i++){
      if(this.reservationsNo[i].id_reservation == id_reservation){
        this.reservationsNo.splice(i,1)
        resultado = "si"
      }else{
        resultado = "no"
      }
    }
    return resultado
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

  openDialog() {
    const dialogRef = this.dialog.open(ModalRestauranteComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

