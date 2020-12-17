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

  abiertoCerradoDiaLunes(esto){
     //AQUI HAY QUE AÑADIR A LA BASE DE DATOS QUE EL CALENDARIO NO FUNCIONE ESE DIA, AQUI SOLO SE MUESTRA
     var ellunes=document.getElementById("ellunes");
     var labell=document.getElementById("labell");
     var cartelcerrado=document.getElementById("cerrado");

     if (ellunes.style.display === "none") {
        labell.innerHTML="Abierto";
        ellunes.style.display = "block";
        cartelcerrado.style.display="none";
    } else {
        labell.innerHTML="Cerrado";
        ellunes.style.display = "none";
        cartelcerrado.style.display="block";
    }
  }
desayunoLunes(esto){
      var input1dl= <HTMLInputElement>document.getElementById("input1dl");
      var input2dl= <HTMLInputElement>document.getElementById("input2dl");
      var butondl= <HTMLInputElement>document.getElementById("butondl");
      var labeldl= <HTMLInputElement>document.getElementById("labeldl");
      var adl= <HTMLInputElement>document.getElementById("adl");
      

      
      if (input1dl.disabled === true) {
          input1dl.disabled=false;
          input2dl.disabled=false;
          butondl.disabled=false;
          butondl.style.opacity="1";
          labeldl.style.opacity="1";
          adl.style.opacity="1";

        
      } else {
          input1dl.disabled=true;
          input2dl.disabled=true;
          butondl.disabled=true;
          butondl.style.opacity="0.5";
          labeldl.style.opacity="0.5";
          adl.style.opacity="0.5";
      }

    }

    comidaLunes(esto){
      var input1al= <HTMLInputElement>document.getElementById("input1al");
      var input2al= <HTMLInputElement>document.getElementById("input2al");
      var butonal= <HTMLInputElement>document.getElementById("butonal");
      var labelal=<HTMLInputElement>document.getElementById("labelal");
      var aal=<HTMLInputElement>document.getElementById("aal");

      if (input1al.disabled === true) {
          input1al.disabled=false;
          input2al.disabled=false;
          butonal.disabled=false;
          butonal.style.opacity="1";
          labelal.style.opacity="1";
          aal.style.opacity="1";

        
      } else {
          input1al.disabled=true;
          input2al.disabled=true;
          butonal.disabled=true;
          butonal.style.opacity="0.5";
          labelal.style.opacity="0.5";
          aal.style.opacity="0.5";
          
      }

    }
 
    cenaLunes(esto){
      var input1cl= <HTMLInputElement>document.getElementById("input1cl");
      var input2cl= <HTMLInputElement>document.getElementById("input2cl");
      var butoncl= <HTMLInputElement>document.getElementById("butoncl");
      var labelcl=<HTMLInputElement>document.getElementById("labelcl");
      var acl=<HTMLInputElement>document.getElementById("acl");

      if (input1cl.disabled === true) {
          input1cl.disabled=false;
          input2cl.disabled=false;
          butoncl.disabled=false;
          butoncl.style.opacity="1";
          labelcl.style.opacity="1";
          acl.style.opacity="1";
        
      } else {
          input1cl.disabled=true;
          input2cl.disabled=true;
          butoncl.disabled=true;
          butoncl.style.opacity="0.5";
          labelcl.style.opacity="0.5";
          acl.style.opacity="0.5";
          
      }

    }
 
////////////////////MARTES ////////////////////


abiertoCerradoDiaMartes(esto){
  //AQUI HAY QUE AÑADIR A LA BASE DE DATOS QUE EL CALENDARIO NO FUNCIONE ESE DIA, AQUI SOLO SE MUESTRA
  var elmartes=document.getElementById("elmartes");
  var labelm=document.getElementById("labelm");
  var cartelcerrado=document.getElementById("cerrado");

  if (elmartes.style.display === "none") {
     labelm.innerHTML="Abierto";
     elmartes.style.display = "block";
     cartelcerrado.style.display="none";
 } else {
     labelm.innerHTML="Cerrado";
     elmartes.style.display = "none";
     cartelcerrado.style.display="block";
 }
}
desayunoMartes(esto){
   var input1dm= <HTMLInputElement>document.getElementById("input1dm");
   var input2dm= <HTMLInputElement>document.getElementById("input2dm");
   var butondm= <HTMLInputElement>document.getElementById("butondm");
   var labeldm= <HTMLInputElement>document.getElementById("labeldm");
   var adm= <HTMLInputElement>document.getElementById("adm");
   

   
   if (input1dm.disabled === true) {
       input1dm.disabled=false;
       input2dm.disabled=false;
       butondm.disabled=false;
       butondm.style.opacity="1";
       labeldm.style.opacity="1";
       adm.style.opacity="1";

     
   } else {
       input1dm.disabled=true;
       input2dm.disabled=true;
       butondm.disabled=true;
       butondm.style.opacity="0.5";
       labeldm.style.opacity="0.5";
       adm.style.opacity="0.5";
   }

 }

 comidaMartes(esto){
   var input1am= <HTMLInputElement>document.getElementById("input1am");
   var input2am= <HTMLInputElement>document.getElementById("input2am");
   var butonam= <HTMLInputElement>document.getElementById("butonam");
   var labelam=<HTMLInputElement>document.getElementById("labelam");
   var aam=<HTMLInputElement>document.getElementById("aam");

   if (input1am.disabled === true) {
       input1am.disabled=false;
       input2am.disabled=false;
       butonam.disabled=false;
       butonam.style.opacity="1";
       labelam.style.opacity="1";
       aam.style.opacity="1";

     
   } else {
       input1am.disabled=true;
       input2am.disabled=true;
       butonam.disabled=true;
       butonam.style.opacity="0.5";
       labelam.style.opacity="0.5";
       aam.style.opacity="0.5";
       
   }

 }

 cenaMartes(esto){
   var input1cm= <HTMLInputElement>document.getElementById("input1cm");
   var input2cm= <HTMLInputElement>document.getElementById("input2cm");
   var butoncm= <HTMLInputElement>document.getElementById("butoncm");
   var labelcm=<HTMLInputElement>document.getElementById("labelcm");
   var acm=<HTMLInputElement>document.getElementById("acm");

   if (input1cm.disabled === true) {
       input1cm.disabled=false;
       input2cm.disabled=false;
       butoncm.disabled=false;
       butoncm.style.opacity="1";
       labelcm.style.opacity="1";
       acm.style.opacity="1";
     
   } else {
       input1cm.disabled=true;
       input2cm.disabled=true;
       butoncm.disabled=true;
       butoncm.style.opacity="0.5";
       labelcm.style.opacity="0.5";
       acm.style.opacity="0.5";
       
   }

 }

 ///////////// MIERCOLES /////////////////////////////

 
abiertoCerradoDiaMiercoles(esto){
  //AQUI HAY QUE AÑADIR A LA BASE DE DATOS QUE EL CALENDARIO NO FUNCIONE ESE DIA, AQUI SOLO SE MUESTRA
  var elmiercoles=document.getElementById("elmiercoles");
  var labelx=document.getElementById("labelx");
  var cartelcerrado=document.getElementById("cerrado");

  if (elmiercoles.style.display === "none") {
     labelx.innerHTML="Abierto";
     elmiercoles.style.display = "block";
     cartelcerrado.style.display="none";
 } else {
     labelx.innerHTML="Cerrado";
     elmiercoles.style.display = "none";
     cartelcerrado.style.display="block";
 }
}
desayunoMiercoles(esto){
   var input1dx= <HTMLInputElement>document.getElementById("input1dx");
   var input2dx= <HTMLInputElement>document.getElementById("input2dx");
   var butondx= <HTMLInputElement>document.getElementById("butondx");
   var labeldx= <HTMLInputElement>document.getElementById("labeldx");
   var adx= <HTMLInputElement>document.getElementById("adx");
   

   
   if (input1dx.disabled === true) {
       input1dx.disabled=false;
       input2dx.disabled=false;
       butondx.disabled=false;
       butondx.style.opacity="1";
       labeldx.style.opacity="1";
       adx.style.opacity="1";

     
   } else {
       input1dx.disabled=true;
       input2dx.disabled=true;
       butondx.disabled=true;
       butondx.style.opacity="0.5";
       labeldx.style.opacity="0.5";
       adx.style.opacity="0.5";
   }

 }

 comidaMiercoles(esto){
   var input1ax= <HTMLInputElement>document.getElementById("input1ax");
   var input2ax= <HTMLInputElement>document.getElementById("input2ax");
   var butonax= <HTMLInputElement>document.getElementById("butonax");
   var labelax=<HTMLInputElement>document.getElementById("labelax");
   var aax=<HTMLInputElement>document.getElementById("aax");

   if (input1ax.disabled === true) {
       input1ax.disabled=false;
       input2ax.disabled=false;
       butonax.disabled=false;
       butonax.style.opacity="1";
       labelax.style.opacity="1";
       aax.style.opacity="1";

     
   } else {
       input1ax.disabled=true;
       input2ax.disabled=true;
       butonax.disabled=true;
       butonax.style.opacity="0.5";
       labelax.style.opacity="0.5";
       aax.style.opacity="0.5";
       
   }

 }

 cenaMiercoles(esto){
   var input1cx= <HTMLInputElement>document.getElementById("input1cx");
   var input2cx= <HTMLInputElement>document.getElementById("input2cx");
   var butoncx= <HTMLInputElement>document.getElementById("butoncx");
   var labelcx=<HTMLInputElement>document.getElementById("labelcx");
   var acx=<HTMLInputElement>document.getElementById("acx");

   if (input1cx.disabled === true) {
       input1cx.disabled=false;
       input2cx.disabled=false;
       butoncx.disabled=false;
       butoncx.style.opacity="1";
       labelcx.style.opacity="1";
       acx.style.opacity="1";
     
   } else {
       input1cx.disabled=true;
       input2cx.disabled=true;
       butoncx.disabled=true;
       butoncx.style.opacity="0.5";
       labelcx.style.opacity="0.5";
       acx.style.opacity="0.5";
       
   }

 }
////////////////////// JUEVES ////////////////////////////


abiertoCerradoDiaJueves(esto){
  //AQUI HAY QUE AÑADIR A LA BASE DE DATOS QUE EL CALENDARIO NO FUNCIONE ESE DIA, AQUI SOLO SE MUESTRA
  var eljueves=document.getElementById("eljueves");
  var labelj=document.getElementById("labelj");
  var cartelcerrado=document.getElementById("cerrado");

  if (eljueves.style.display === "none") {
     labelj.innerHTML="Abierto";
     eljueves.style.display = "block";
     cartelcerrado.style.display="none";
 } else {
     labelj.innerHTML="Cerrado";
     eljueves.style.display = "none";
     cartelcerrado.style.display="block";
 }
}
desayunoJueves(esto){
   var input1dj= <HTMLInputElement>document.getElementById("input1dj");
   var input2dj= <HTMLInputElement>document.getElementById("input2dj");
   var butondj= <HTMLInputElement>document.getElementById("butondj");
   var labeldj= <HTMLInputElement>document.getElementById("labeldj");
   var adj= <HTMLInputElement>document.getElementById("adj");
   

   
   if (input1dj.disabled === true) {
       input1dj.disabled=false;
       input2dj.disabled=false;
       butondj.disabled=false;
       butondj.style.opacity="1";
       labeldj.style.opacity="1";
       adj.style.opacity="1";

     
   } else {
       input1dj.disabled=true;
       input2dj.disabled=true;
       butondj.disabled=true;
       butondj.style.opacity="0.5";
       labeldj.style.opacity="0.5";
       adj.style.opacity="0.5";
   }

 }

 comidaJueves(esto){
   var input1aj= <HTMLInputElement>document.getElementById("input1aj");
   var input2aj= <HTMLInputElement>document.getElementById("input2aj");
   var butonaj= <HTMLInputElement>document.getElementById("butonaj");
   var labelaj=<HTMLInputElement>document.getElementById("labelaj");
   var aaj=<HTMLInputElement>document.getElementById("aaj");

   if (input1aj.disabled === true) {
       input1aj.disabled=false;
       input2aj.disabled=false;
       butonaj.disabled=false;
       butonaj.style.opacity="1";
       labelaj.style.opacity="1";
       aaj.style.opacity="1";

     
   } else {
       input1aj.disabled=true;
       input2aj.disabled=true;
       butonaj.disabled=true;
       butonaj.style.opacity="0.5";
       labelaj.style.opacity="0.5";
       aaj.style.opacity="0.5";
       
   }

 }

 cenaJueves(esto){
   var input1cj= <HTMLInputElement>document.getElementById("input1cj");
   var input2cj= <HTMLInputElement>document.getElementById("input2cj");
   var butoncj= <HTMLInputElement>document.getElementById("butoncj");
   var labelcj=<HTMLInputElement>document.getElementById("labelcj");
   var acj=<HTMLInputElement>document.getElementById("acj");

   if (input1cj.disabled === true) {
       input1cj.disabled=false;
       input2cj.disabled=false;
       butoncj.disabled=false;
       butoncj.style.opacity="1";
       labelcj.style.opacity="1";
       acj.style.opacity="1";
     
   } else {
       input1cj.disabled=true;
       input2cj.disabled=true;
       butoncj.disabled=true;
       butoncj.style.opacity="0.5";
       labelcj.style.opacity="0.5";
       acj.style.opacity="0.5";
       
   }

 }

 //////////////////////////////VIERNES/////////////////////////////

 

abiertoCerradoDiaViernes(esto){
  //AQUI HAY QUE AÑADIR A LA BASE DE DATOS QUE EL CALENDARIO NO FUNCIONE ESE DIA, AQUI SOLO SE MUESTRA
  var elviernes=document.getElementById("elviernes");
  var labelv=document.getElementById("labelv");
  var cartelcerrado=document.getElementById("cerrado");

  if (elviernes.style.display === "none") {
     labelv.innerHTML="Abierto";
     elviernes.style.display = "block";
     cartelcerrado.style.display="none";
 } else {
     labelv.innerHTML="Cerrado";
     elviernes.style.display = "none";
     cartelcerrado.style.display="block";
 }
}
desayunoViernes(esto){
   var input1dv= <HTMLInputElement>document.getElementById("input1dv");
   var input2dv= <HTMLInputElement>document.getElementById("input2dv");
   var butondv= <HTMLInputElement>document.getElementById("butondv");
   var labeldv= <HTMLInputElement>document.getElementById("labeldv");
   var adv= <HTMLInputElement>document.getElementById("adv");
   

   
   if (input1dv.disabled === true) {
       input1dv.disabled=false;
       input2dv.disabled=false;
       butondv.disabled=false;
       butondv.style.opacity="1";
       labeldv.style.opacity="1";
       adv.style.opacity="1";

     
   } else {
       input1dv.disabled=true;
       input2dv.disabled=true;
       butondv.disabled=true;
       butondv.style.opacity="0.5";
       labeldv.style.opacity="0.5";
       adv.style.opacity="0.5";
   }

 }

 comidaViernes(esto){
   var input1av= <HTMLInputElement>document.getElementById("input1av");
   var input2av= <HTMLInputElement>document.getElementById("input2av");
   var butonav= <HTMLInputElement>document.getElementById("butonav");
   var labelav=<HTMLInputElement>document.getElementById("labelav");
   var aav=<HTMLInputElement>document.getElementById("aav");

   if (input1av.disabled === true) {
       input1av.disabled=false;
       input2av.disabled=false;
       butonav.disabled=false;
       butonav.style.opacity="1";
       labelav.style.opacity="1";
       aav.style.opacity="1";

     
   } else {
       input1av.disabled=true;
       input2av.disabled=true;
       butonav.disabled=true;
       butonav.style.opacity="0.5";
       labelav.style.opacity="0.5";
       aav.style.opacity="0.5";
       
   }

 }

 cenaViernes(esto){
   var input1cv= <HTMLInputElement>document.getElementById("input1cv");
   var input2cv= <HTMLInputElement>document.getElementById("input2cv");
   var butoncv= <HTMLInputElement>document.getElementById("butoncv");
   var labelcv=<HTMLInputElement>document.getElementById("labelcv");
   var acv=<HTMLInputElement>document.getElementById("acv");

   if (input1cv.disabled === true) {
       input1cv.disabled=false;
       input2cv.disabled=false;
       butoncv.disabled=false;
       butoncv.style.opacity="1";
       labelcv.style.opacity="1";
       acv.style.opacity="1";
     
   } else {
       input1cv.disabled=true;
       input2cv.disabled=true;
       butoncv.disabled=true;
       butoncv.style.opacity="0.5";
       labelcv.style.opacity="0.5";
       acv.style.opacity="0.5";
       
   }

 }

//////////////////// SABADOOO //////////////////////////////////


abiertoCerradoDiaSabado(esto){
  //AQUI HAY QUE AÑADIR A LA BASE DE DATOS QUE EL CALENDARIO NO FUNCIONE ESE DIA, AQUI SOLO SE MUESTRA
  var elsabado=document.getElementById("elsabado");
  var labels=document.getElementById("labels");
  var cartelcerrado=document.getElementById("cerrado");

  if (elsabado.style.display === "none") {
     labels.innerHTML="Abierto";
     elsabado.style.display = "block";
     cartelcerrado.style.display="none";
 } else {
     labels.innerHTML="Cerrado";
     elsabado.style.display = "none";
     cartelcerrado.style.display="block";
 }
}
desayunoSabado(esto){
   var input1ds= <HTMLInputElement>document.getElementById("input1ds");
   var input2ds= <HTMLInputElement>document.getElementById("input2ds");
   var butonds= <HTMLInputElement>document.getElementById("butonds");
   var labelds= <HTMLInputElement>document.getElementById("labelds");
   var ads= <HTMLInputElement>document.getElementById("ads");
   

   
   if (input1ds.disabled === true) {
       input1ds.disabled=false;
       input2ds.disabled=false;
       butonds.disabled=false;
       butonds.style.opacity="1";
       labelds.style.opacity="1";
       ads.style.opacity="1";

     
   } else {
       input1ds.disabled=true;
       input2ds.disabled=true;
       butonds.disabled=true;
       butonds.style.opacity="0.5";
       labelds.style.opacity="0.5";
       ads.style.opacity="0.5";
   }

 }

 comidaSabado(esto){
   var input1as= <HTMLInputElement>document.getElementById("input1as");
   var input2as= <HTMLInputElement>document.getElementById("input2as");
   var butonas= <HTMLInputElement>document.getElementById("butonas");
   var labelas=<HTMLInputElement>document.getElementById("labelas");
   var aas=<HTMLInputElement>document.getElementById("aas");

   if (input1as.disabled === true) {
       input1as.disabled=false;
       input2as.disabled=false;
       butonas.disabled=false;
       butonas.style.opacity="1";
       labelas.style.opacity="1";
       aas.style.opacity="1";

     
   } else {
       input1as.disabled=true;
       input2as.disabled=true;
       butonas.disabled=true;
       butonas.style.opacity="0.5";
       labelas.style.opacity="0.5";
       aas.style.opacity="0.5";
       
   }

 }

 cenaSabado(esto){
   var input1cs= <HTMLInputElement>document.getElementById("input1cs");
   var input2cs= <HTMLInputElement>document.getElementById("input2cs");
   var butoncs= <HTMLInputElement>document.getElementById("butoncs");
   var labelcs=<HTMLInputElement>document.getElementById("labelcs");
   var acs=<HTMLInputElement>document.getElementById("acs");

   if (input1cs.disabled === true) {
       input1cs.disabled=false;
       input2cs.disabled=false;
       butoncs.disabled=false;
       butoncs.style.opacity="1";
       labelcs.style.opacity="1";
       acs.style.opacity="1";
     
   } else {
       input1cs.disabled=true;
       input2cs.disabled=true;
       butoncs.disabled=true;
       butoncs.style.opacity="0.5";
       labelcs.style.opacity="0.5";
       acs.style.opacity="0.5";
       
   }

 }

 ////////////////DOMINGO /////////////////////


 abiertoCerradoDiaDomingo(esto){
  //AQUI HAY QUE AÑADIR A LA BASE DE DATOS QUE EL CALENDARIO NO FUNCIONE ESE DIA, AQUI SOLO SE MUESTRA
  var eldomingo=document.getElementById("eldomingo");
  var labeld=document.getElementById("labeld");
  var cartelcerrado=document.getElementById("cerrado");

  if (eldomingo.style.display === "none") {
     labeld.innerHTML="Abierto";
     eldomingo.style.display = "block";
     cartelcerrado.style.display="none";
 } else {
     labeld.innerHTML="Cerrado";
     eldomingo.style.display = "none";
     cartelcerrado.style.display="block";
 }
}
desayunoDomingo(esto){
   var input1dd= <HTMLInputElement>document.getElementById("input1dd");
   var input2dd= <HTMLInputElement>document.getElementById("input2dd");
   var butondd= <HTMLInputElement>document.getElementById("butondd");
   var labeldd= <HTMLInputElement>document.getElementById("labeldd");
   var add= <HTMLInputElement>document.getElementById("add");
   

   
   if (input1dd.disabled === true) {
       input1dd.disabled=false;
       input2dd.disabled=false;
       butondd.disabled=false;
       butondd.style.opacity="1";
       labeldd.style.opacity="1";
       add.style.opacity="1";

     
   } else {
       input1dd.disabled=true;
       input2dd.disabled=true;
       butondd.disabled=true;
       butondd.style.opacity="0.5";
       labeldd.style.opacity="0.5";
       add.style.opacity="0.5";
   }

 }

 comidaDomingo(esto){
   var input1ad= <HTMLInputElement>document.getElementById("input1ad");
   var input2ad= <HTMLInputElement>document.getElementById("input2ad");
   var butonad= <HTMLInputElement>document.getElementById("butonad");
   var labelad=<HTMLInputElement>document.getElementById("labelad");
   var aad=<HTMLInputElement>document.getElementById("aad");

   if (input1ad.disabled === true) {
       input1ad.disabled=false;
       input2ad.disabled=false;
       butonad.disabled=false;
       butonad.style.opacity="1";
       labelad.style.opacity="1";
       aad.style.opacity="1";

     
   } else {
       input1ad.disabled=true;
       input2ad.disabled=true;
       butonad.disabled=true;
       butonad.style.opacity="0.5";
       labelad.style.opacity="0.5";
       aad.style.opacity="0.5";
       
   }

 }

 cenaDomingo(esto){
   var input1cd= <HTMLInputElement>document.getElementById("input1cd");
   var input2cd= <HTMLInputElement>document.getElementById("input2cd");
   var butoncd= <HTMLInputElement>document.getElementById("butoncd");
   var labelcd=<HTMLInputElement>document.getElementById("labelcd");
   var acd=<HTMLInputElement>document.getElementById("acd");

   if (input1cd.disabled === true) {
       input1cd.disabled=false;
       input2cd.disabled=false;
       butoncd.disabled=false;
       butoncd.style.opacity="1";
       labelcd.style.opacity="1";
       acd.style.opacity="1";
     
   } else {
       input1cd.disabled=true;
       input2cd.disabled=true;
       butoncd.disabled=true;
       butoncd.style.opacity="0.5";
       labelcd.style.opacity="0.5";
       acd.style.opacity="0.5";
       
   }

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
