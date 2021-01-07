import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OwnerComponent } from '../components/login/registration/owner/owner.component';
import { ModalRegistroUsuarioComponent } from '../components/modals/modal-registro-usuario/modal-registro-usuario.component';
import { UserOwner } from '../models/user-owner';
import { Users } from '../models/users';
import { ServiceLoginService } from './service-login.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceRegistrationService {
public url:string="http://localhost:3000/registration";
  constructor(private router:Router,
    private http:HttpClient,
    private apiLogin:ServiceLoginService,
    private dialog:MatDialog) { }

  public registrationOwner(newOwner:any){
    this.http.post(this.url, newOwner)
    .subscribe((data:any)=>{console.log(data)
      if(data.control==true){
        this.router.navigate(['/restaurants-list']);
        this.apiLogin.userOwner= new UserOwner
        (data.data.owner_id,newOwner.cif,newOwner.name,newOwner.surname,null);
        this.apiLogin.users= new Users (null,data.data.owner_id,null,newOwner.mail,newOwner.password)
      }
      else{
      const dialogRef = this.dialog.open(ModalRegistroUsuarioComponent);
        dialogRef.componentInstance.email=newOwner.mail;
        const email:any=document.getElementById("profile")
        email.value=null;
        const password:any=document.getElementById("password")
        password.value=null;
        dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        });
      
    }})}
  
  public registrationCustomer(newCustomer:any){
     return this.http.post(this.url, newCustomer)
  }
}
