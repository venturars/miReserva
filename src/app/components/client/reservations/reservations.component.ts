import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationsClient } from 'src/app/models/reservations-client';
import { ModalClienteComponent } from '../../modals/modal-cliente/modal-cliente.component';

@Component({
  selector: 'app-client-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsClientComponent implements OnInit {
public reservations:ReservationsClient[]
  constructor(public dialog: MatDialog) {
    this.reservations = [
      {id_reservation: 1,date:2020,time:24,obs:"hola1",pax:4,id_restaurant:8},
      {id_reservation: 2,date:2019,time:23,obs:"hola2",pax:3,id_restaurant:6},
      {id_reservation: 3,date:2018,time:21,obs:"hola3",pax:2,id_restaurant:4},
      {id_reservation: 4,date:2017,time:20,obs:"hola4",pax:1,id_restaurant:2}
    ]
   }

  ngOnInit(): void {
  }

  public deleteReservation(id_reservation:number){
    let resultado =""
    console.log(id_reservation);
    
    
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

  openDialog() {
    const dialogRef = this.dialog.open(ModalClienteComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
