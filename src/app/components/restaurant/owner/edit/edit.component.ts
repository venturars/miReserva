import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-restaurant-owner-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})



export class EditComponentR implements OnInit {

  public user:User;
  


  constructor( ) {
    this.user= new User("prueba@correo.com","asdasdasd",true,"Pedro","López","B829475824");
   }
  

   processFile(imageInput: any) {
    //SE SUBEN LOS DATOS DEL FICHERO SUBIDO
    const file: File = imageInput.files[0];
    //SE CREA ELEMENTO FILE READER
    const reader = new FileReader();
    //AL CARGAR EL FICHERO SE USA PARA CAMBIAR EL SRC DE LA IMAGEN
    reader.addEventListener('load', (event: any) => {
    // const imagen=document.getElementById("prueba").setAttribute("src", event.target.result);
    this.user.image="assets/photos/" +file.name;
    const imagen=document.getElementById("prueba").setAttribute("src", this.user.image);
    // GUARDAMOS STRING PARA PODER USARLA EN TODA LA WEB  
    
    
  })
  reader.readAsDataURL(file);
}
       
  
onSubmit(form){
  console.log(form.value);
} 

  ngOnInit(): void {
  }

}
