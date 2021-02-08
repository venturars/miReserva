
import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Shifts } from 'src/app/models/shifts';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';
import { ServiceShiftsService } from 'src/app/shared/service-shifts.service';
import { ServiceTimesService } from 'src/app/shared/service-times.service';

@Component({
  selector: 'app-modal-turnos',
  templateUrl: './modal-turnos.component.html',
  styleUrls: ['./modal-turnos.component.scss']
})
export class ModalTurnosComponent implements OnInit {
  public name:string
  public service:string
  public limiteinicio:string;
  public limitefinal:string;
  public times_id:number;
  public shifts:Shifts[];
  public shift:Shifts=new Shifts (null,null,null,null,null,null,null);
  public fallo:boolean=false;
  constructor(public apiTimes:ServiceTimesService,
             public serviceRestaurant:ServiceRestaurantService,
             public apiShifts:ServiceShiftsService) { 
  this.shifts=[];
  
}
  ngOnInit(): void {
    
    const restaurant=this.serviceRestaurant.id_restaurant;
    const name=this.name;
    const service=this.service;
    this.apiTimes.checkTimes(name,restaurant,service)
    .subscribe((data:any)=>{
      console.log(data.data[0].time_from);
      console.log(data.data[0].time_to)
      this.limiteinicio=data.data[0].time_from;
      this.limitefinal=data.data[0].time_to;
      this.times_id=data.data[0].times_id;
    
      this.apiShifts.getShiftsIdTimes(this.times_id)
      .subscribe((data:any)=>{
        console.log(data);
        if (data.control==true){
          for (let i=0;i<data.data.length;i++){
            this.shifts.push(data.data[i])
          }
           
            console.log(this.shifts);
        }
        else{
          
          console.log(this.shifts);
        }
        
      })
  })
    

}

addShifts(inicio,final,paxmax){
  
  const newshift= new Shifts (null,this.name,inicio,final,this.serviceRestaurant.id_restaurant,this.times_id,paxmax)
  this.apiShifts.postShifts(newshift)
  .subscribe((data:any)=>{ console.log(data)
    const newshift= new Shifts (data.data.shifts,this.name,inicio,final,this.serviceRestaurant.id_restaurant,this.times_id,paxmax)
    this.shifts.push(newshift)
  })
}

deleteShifts(i,shift){
  this.shifts.splice(i,1);
  this.apiShifts.deleteShifts(shift.shift_id)
  .subscribe((data)=>{console.log(data)});
}

maximo(pax,otro){

otro.value=this.serviceRestaurant.capacity+1;
}

onSubmit(formulario){
let turnohorainicio=  parseInt(formulario.value.shift_from);
let turnominutosinicio=parseInt(formulario.value.shift_from.substring(3,5));
let horariohorainicio=parseInt(this.limiteinicio);

  if (this.limiteinicio.length==4){
      this.limiteinicio= "0"+this.limiteinicio;
    }
this.fallo=false;
let horariominutosinicio=parseInt(this.limiteinicio.substring(3,5));

let turnohorafinal = parseInt(formulario.value.shift_to);
let turnominutosfinal= parseInt(formulario.value.shift_to.substring(3,5));
let horariohorafinal=parseInt(this.limitefinal);
  if (this.limitefinal.length==4){
      this.limitefinal= "0"+this.limitefinal;
    }

let horariominutosfinal=parseInt(this.limitefinal.substring(3,5));
  if (
      ((turnohorainicio<horariohorainicio) || (turnohorainicio==horariohorainicio && turnominutosinicio<horariominutosinicio))
      ||
      ((turnohorafinal<horariohorainicio) || (turnohorafinal==horariohorainicio && turnominutosfinal<horariominutosinicio))
      ||
      ((turnohorainicio>horariohorafinal) || (turnohorainicio==horariohorafinal && turnominutosinicio>horariominutosfinal))
      ||
      ((turnohorafinal>horariohorafinal)  || (turnohorafinal==horariohorafinal && turnominutosfinal>horariominutosfinal))
    )
    {
    this.fallo=true;    
    }

  else{
      this.fallo=false;
      this.addShifts(formulario.value.shift_from, formulario.value.shift_to, formulario.value.pax)
      let shift_from:any=document.getElementById("shift_from")
      shift_from.value="";
      let shift_to:any=document.getElementById("shift_to")
      shift_to.value="";
      let pax:any=document.getElementById("pax");
      pax.value="";
}   
  }

}
