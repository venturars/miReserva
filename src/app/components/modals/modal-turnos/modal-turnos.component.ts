
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
  const newshift= new Shifts (null,this.name,inicio.value,final.value,this.serviceRestaurant.id_restaurant,this.times_id,paxmax.value)
  this.apiShifts.postShifts(newshift)
  .subscribe((data:any)=>{ console.log(data)
    const newshift= new Shifts (data.data.shifts,this.name,inicio.value,final.value,this.serviceRestaurant.id_restaurant,this.times_id,paxmax.value)
    this.shifts.push(newshift)
  })
}

deleteShifts(i,shift){
  this.shifts.splice(i,1);
  this.apiShifts.deleteShifts(shift.shift_id)
  .subscribe((data)=>{console.log(data)});
}

maximo(paxmax){
paxmax.value=this.serviceRestaurant.capacity;
}

}
