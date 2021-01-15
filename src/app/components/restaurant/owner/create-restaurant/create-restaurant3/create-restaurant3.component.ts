import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroComponent } from 'src/app/components/modals/modal-registro/modal-registro.component';
import { ModalTurnosComponent } from 'src/app/components/modals/modal-turnos/modal-turnos.component';
import { Times } from 'src/app/models/times';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';
import { ServiceShiftsService } from 'src/app/shared/service-shifts.service';
import { ServiceTimesService } from 'src/app/shared/service-times.service';

class Turnos {
  constructor (public horario:string){
}}

@Component({
  selector: 'app-restaurant-owner-CreateRestaurant3',
  templateUrl: './create-restaurant3.component.html',
  styleUrls: ['./create-restaurant3.component.scss']
})
export class CreateRestaurant3Component implements OnInit {

  public structure:object[] = [
    {day: "Lunes",dayI: "Mon"},
    {day: "Martes",dayI: "Tue"},
    {day: "Miércoles",dayI: "Wed"},
    {day: "Jueves",dayI: "Thu"},
    {day: "Viernes",dayI: "Fri"},
    {day: "Sábado",dayI: "Sat"},
    {day: "Domingo",dayI: "Sun"}
  ];
  public days:object[] = [
    {
      turn:"Desayuno",
      name:"Desayunos",
      name2:"desayuno",
      horarios: [
        {horario:"7:00"},
        {horario:"7:30"},
        {horario:"8:00"},
        {horario:"8:30"},
        {horario:"9:00"},
        {horario:"9:30"},
        {horario:"10:00"},
        {horario:"10:30"},
        {horario:"11:00"},
        {horario:"11:30"},
        {horario:"12:00"}
      ],
    },
    {
      turn:"Almuerzo",
      name:"Comidas",
      name2:"comida",
      horarios: [
        {horario:"12:00"},
        {horario:"12:30"},
        {horario:"13:00"},
        {horario:"13:30"},
        {horario:"14:00"},
        {horario:"14:30"},
        {horario:"15:00"},
        {horario:"15:30"},
        {horario:"16:00"},
        {horario:"16:30"},
        {horario:"17:00"}
      ],
    },
    {
      turn:"Cena",
      name:"Cenas",
      name2:"cena",
      horarios: [
        {horario:"19:00"},
        {horario:"19:30"},
        {horario:"20:00"},
        {horario:"20:30"},
        {horario:"21:00"},
        {horario:"21:30"},
        {horario:"22:00"},
        {horario:"22:30"},
        {horario:"23:00"},
        {horario:"23:30"},
        {horario:"24:00"}
      ],
    }
  ];
  constructor(
    private dialog: MatDialog,
    public serviceTimes:ServiceTimesService,
    public serviceRestaurant:ServiceRestaurantService,
    public serviceShfts:ServiceShiftsService
  ) { }
  public openCloseDay(
      event:any,
      dayM:string,
      botoncheck:any,
      desayuno:any,
      almuerzo:any,
      cena:any
    ) {
    this.serviceTimes.checkDaysTimes(dayM,this.serviceRestaurant.id_restaurant).subscribe((data) => {
      if(data.control) {
        for (let i = 0; i < data.data.length; i++) {
          const time:Times=data.data[i];
          if(!botoncheck.checked) {
            time.active = "false";
          }else {
            if (!desayuno.checked && time.service == 'Desayuno') {
            time.active = "false";
            }else if(!almuerzo.checked && time.service == 'Almuerzo') {
              time.active = "false";
            }else if(!cena.checked && time.service == 'Cena') {
              time.active = "false";
            }else {
              time.active = "true";
          }}
          this.serviceTimes.putTimes(time).subscribe();
  }}});}
  public turn(
    event:any,
    dayM:string,
    service:string,
    input1:HTMLInputElement,
    input2:HTMLInputElement,
    buton:HTMLInputElement
    ) {
    this.serviceTimes.checkTimes(dayM,this.serviceRestaurant.id_restaurant,service).subscribe((data:any) => {
      if(!data.control) {
      }else {
        const id_times:Times = data.data[0];
        if(id_times.active == "true") {
          id_times.active = "false";
        }else {
          id_times.active="true";
        }
        this.serviceTimes.putTimes(id_times).subscribe();
    }});
    if(input1.disabled) {
      input1.disabled = false;
      input2.disabled = false;
      buton.disabled = false;
    }else {
      input1.disabled = true;
      input2.disabled = true;
      buton.disabled = true;
  }}
  public openDialog() {
    const dialogRef = this.dialog.open(ModalTurnosComponent);
    dialogRef.afterClosed().subscribe();
  }
  private turnsD(turn:string,day:string) {
    const dialogRef = this.dialog.open(ModalTurnosComponent);
    dialogRef.componentInstance.name = day;
    dialogRef.componentInstance.service = turn;
    dialogRef.afterClosed().subscribe();
  }
  public setTimes(
    inicio:any,
    final:any,
    day:string,
    turn:string
  ){
  if(inicio.value=="Inicio"){
    console.log("hacemos un toast para sacar el fallo");
  }else {
    inicio.cssText="border-color: var(--primaryColor); color: var(--primaryColor)";
    final.cssText="border-color: var(--primaryColor); color: var(--primaryColor)";
    const name = day;
    const restaurant = this.serviceRestaurant.id_restaurant;
    const service = turn;
    this.serviceTimes.checkTimes(name,restaurant,service).subscribe((data:any) => {
      if(!data.control) {
        const time = new Times (null,day,inicio.value,final.value,this.serviceRestaurant.id_restaurant,turn,"true");
        this.serviceTimes.inicio = inicio.value;
        this.serviceTimes.fin = final.value;
        this.serviceTimes.postTimes(time).subscribe();
        this.turnsD(turn,day);
      }else {
        if(data.data[0].time_from == inicio.value && data.data[0].time_to == final.value) {
          this.turnsD(turn,day);
        }else {
          this.serviceShfts.getShiftsIdTimes(data.data[0].times_id).subscribe((data:any) => {
            for(let i = 0; i < data.data.length; i++) {
              this.serviceShfts.deleteShifts(data.data[i].shift_id).subscribe();
          }});
          const time = new Times (data.data[0].times_id,day,inicio.value,final.value,this.serviceRestaurant.id_restaurant,turn,"true");
          this.serviceTimes.inicio = inicio.value;
          this.serviceTimes.fin = final.value;
          this.serviceTimes.putTimes(time).subscribe();
          this.turnsD
          (turn,day);
          this.borramosModal();
}}});}}
  public checkIt(
    horainicio:HTMLSelectElement,
    horafinal:HTMLSelectElement
  ) {
    if (horainicio.selectedIndex >= horafinal.selectedIndex) {
      horafinal.selectedIndex= horainicio.selectedIndex + 1;
  }}
  public changeInput(
    inicio:HTMLSelectElement,
    fin:HTMLSelectElement
  ) {
    fin.style.backgroundColor="let(--secundaryColor)";
    inicio.style.backgroundColor="let(--secundaryColor)";
  }
  public borramosModal() {
    const dialogRef = this.dialog.open(ModalRegistroComponent,{panelClass: ['animate__animated','animate__backInDown']});
    dialogRef.componentInstance.imagen="..//..//..//..//assets/null.svg";
    dialogRef.componentInstance.mensaje="Eliminamos los turnos creados al cambiar el horario establecido";
    dialogRef.afterClosed().subscribe();
  }
  ngOnInit() {
}}