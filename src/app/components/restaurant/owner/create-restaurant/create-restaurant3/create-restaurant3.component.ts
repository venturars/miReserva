import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalTurnosComponent } from 'src/app/components/modals/modal-turnos/modal-turnos.component';
import { Turnos } from 'src/app/models/turnos';

@Component({
  selector: 'app-restaurant-owner-CreateRestaurant3',
  templateUrl: './create-restaurant3.component.html',
  styleUrls: ['./create-restaurant3.component.scss']
})
export class CreateRestaurant3Component implements OnInit {
  public desayunos:Turnos[]
  public almuerzos:Turnos[]
  public cenas:Turnos[]
  public CheckboxVar:boolean

  constructor(public dialog: MatDialog) {
    this.desayunos = [
      {horario:"7:00"},
      {horario:"7:30"},
      {horario:"8:00"},
      {horario:"8:30"},
      {horario:"9:00"},
      {horario:"9:30"},
      {horario:"10:00"},
      {horario:"10:30"},
      {horario:"11:00"},
      {horario:"11:30"}
    ]

    this.almuerzos = [
      {horario:"12:00"},
      {horario:"12:30"},
      {horario:"13:00"},
      {horario:"13:30"},
      {horario:"14:00"},
      {horario:"14:30"},
      {horario:"15:00"},
      {horario:"15:30"},
      {horario:"16:00"},
      {horario:"16:30"}
    ]

    this.cenas = [
      {horario:"19:00"},
      {horario:"19:30"},
      {horario:"20:00"},
      {horario:"20:30"},
      {horario:"21:00"},
      {horario:"21:30"},
      {horario:"22:00"},
      {horario:"22:30"},
      {horario:"23:00"},
      {horario:"23:30"}
    ]
    this.CheckboxVar = false
    
    
   }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalTurnosComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
