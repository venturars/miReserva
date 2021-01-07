import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalRegistroUsuarioComponent } from 'src/app/components/modals/modal-registro-usuario/modal-registro-usuario.component';
import { User } from 'src/app/models/user';
import { UserOwner } from 'src/app/models/user-owner';
import { Users } from 'src/app/models/users';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { ServiceRegistrationService } from 'src/app/shared/service-registration.service';
import { ServiceUserOwnerService } from 'src/app/shared/service-user-owner.service';

@Component({
  selector: 'app-registration-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  public user:User;
  
  constructor(private router: Router,
    private apiUserOwner:ServiceUserOwnerService, 
    private apiRegistration: ServiceRegistrationService,
    private apiLogin:ServiceLoginService,
    public dialog:MatDialog ) {
    this.user= new User(null,null,null,null,null,null);
   }
onSubmit(form){
  console.log(form.value);
 

  const owner= {
    "owner_id": null,
    "cif": form.value.cif,
    "name": form.value.name,
    "surname": form.value.surname,
    "photo": null,
    "mail":form.value.email,
    "password":form.value.password
  } 
   console.log(owner);
  this.apiRegistration.registrationOwner(owner)
  
  

  
} 
 ngOnInit(): void {
  
  }

}
