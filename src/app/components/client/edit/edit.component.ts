import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-client-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public user:User;
  


  constructor( ) {
    this.user= new User("prueba@correo.com","ajakdsfjkaf",true,"Pedro","López","B829475824");
   }
  

   processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
    const imagen=document.getElementById("prueba").setAttribute("src", event.target.result);
    
  })
  reader.readAsDataURL(file);
}
       
  
onSubmit(form){
  console.log(form.value);
} 

  ngOnInit(): void {
  }

}
