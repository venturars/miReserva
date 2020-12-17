import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-doReservation1',
  templateUrl: './do-reservation1.component.html',
  styleUrls: ['./do-reservation1.component.scss']
})
export class DoReservation1Component implements OnInit {
  public ciudadElegida2: Date

  constructor() { }
  ngOnInit() { 

 }

 public eleccionCiudad(paramsCiudad:Date){
  this.ciudadElegida2 = paramsCiudad
}
}
