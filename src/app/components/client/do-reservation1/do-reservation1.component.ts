import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-doReservation1',
  templateUrl: './do-reservation1.component.html',
  styleUrls: ['./do-reservation1.component.scss']
})
export class DoReservation1Component implements OnInit {
  public personas:number;
  public ciudadElegida2: Date
  public turno:string;
  constructor(public router:Router) {
    this.personas=0;
    this.turno=null;
   }
  ngOnInit() { 

 }

 //ESTA FUNCION HACE QUE SE CAMBIE EL CLICK DEL BOTON EN ROJO SOLO DEJANDO UNO EN ROJO
 // EN this.personas ESTOY GUARDANDO EL NUMERO DE PERSONAS QUE QUIEREN RESERVAR
 elegirpax(event){
  
  this.personas=event.target.value;
  console.log(this.personas);
  const todoslaspax:any=document.getElementsByClassName("numbers");
  for (let i=0;i<todoslaspax.length;i++){
    todoslaspax[i].style.background="var(--secundaryColor)";
    todoslaspax[i].style.color="black";
  }

  const elgrupo:any=document.getElementById("elgrupo");
  elgrupo.value="";
  elgrupo.style.background="var(--secundaryColor)";
  elgrupo.style.color="var(--secundaryColorContrast)";

  event.target.style.background="var(--secundaryColorContrast)";
  event.target.style.color="var(--secundaryColor)";
  
 }

 grupos(valor){
   
   this.personas=valor.target.value;
   console.log(this.personas);
   const todoslaspax:any=document.getElementsByClassName("numbers");
   for (let i=0;i<todoslaspax.length;i++){
    todoslaspax[i].style.background="var(--secundaryColor)";
    todoslaspax[i].style.color="black";
  }
  const elgrupo:any=document.getElementById("elgrupo");
  elgrupo.style.background="var(--secundaryColorContrast)";
  elgrupo.style.color="var(--secundaryColor)";

 }

 //HAY QUE AÑADIR LA VALIDACION DE QUE HAYA MARCADO UN DIA EN EL CALENDARIO, CUANDO YA ESTE EN SERVICIOS
 siguiente(){
  const mensajerror=document.getElementById("mensajerror");
  mensajerror.innerHTML="";
  const turnos:any=document.getElementById("turnos")
  this.turno=turnos.value; 
  if (this.personas==0){
    const mensajerror=document.getElementById("mensajerror");
    mensajerror.innerHTML="Elige número de comensales"
  }
  if (this.turno=="Elige turno"){
    const mensajerror=document.getElementById("mensajerror");
    mensajerror.innerHTML +="<br>Elige turno de comida"
  }
  
  if (this.personas!=0 && this.turno!="Elige turno"){
 this.router.navigate(['/reservation2'])
}
}
 public eleccionCiudad(paramsCiudad:Date){
  this.ciudadElegida2 = paramsCiudad
}
}
