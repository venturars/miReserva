import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceRegistrationService } from 'src/app/shared/service-registration.service';
import { UserOwner } from '../../../../models/user-owner';
import { ModalRegistroUsuarioComponent } from '../../../modals/modal-registro-usuario/modal-registro-usuario.component';
import { ServiceLoginService } from '../../../../shared/service-login.service';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-registration-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

  public users:Users = new Users(null,null,null,null,null);
  public userOwner:UserOwner = new UserOwner(null,null,null,null,null)
  public acept:boolean = null;
  constructor(
    private router: Router,
    private apiRegistration: ServiceRegistrationService,
    private apiLogin:ServiceLoginService,
    public dialog:MatDialog,
    ) {
   }
onSubmit(form:any){
  const owner = {
    "owner_id": null,
    "cif": form.value.cif,
    "name": form.value.name,
    "surname": form.value.surname,
    "photo": null,
    "mail":form.value.email,
    "password":form.value.password
  }
  this.apiRegistration.registrationOwner(owner)
  .subscribe((data:any)=>{console.log(data)
    if(data.control) {
      this.router.navigate(['/restaurants-list']);
      this.apiLogin.userOwner= new UserOwner
      (data.data.owner_id,form.value.cif,form.value.name,form.value.surname,null);
      this.apiLogin.users= new Users (null,data.data,null,form.value.mail,form.value.password)
    }
    else {
    const dialogRef = this.dialog.open(ModalRegistroUsuarioComponent);
      dialogRef.componentInstance.email=form.value.mail;
      const email:any=document.getElementById("profile")
      email.value=null;
      const password:any=document.getElementById("password")
      password.value=null;
      dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
  });}})}
 ngOnInit(): void {
  
  }
}