import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-client-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditClientComponent implements OnInit {
 public user:User;

  constructor( ) {
    this.user= new User("prueba@correo.com","ajakdsfjkaf",true,"Pedro","López","B829475824");
   }
  

   processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
    this.user.image="assets/photos/" +file.name;
    const imagen=document.getElementById("prueba").setAttribute("src", this.user.image);
  })
  reader.readAsDataURL(file);
}
       
  
onSubmit(form){
  console.log(form.value);
} 

  ngOnInit(): void {
  }

}
