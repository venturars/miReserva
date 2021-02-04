import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserCustomer } from 'src/app/models/user-customer';
import { Users } from 'src/app/models/users';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { ServiceRegistrationService } from 'src/app/shared/service-registration.service';
import { SimpleAlertComponent } from '../../../modals/simple-alert/simple-alert';
import { ServiceRouterService } from '../../../../shared/service-router.service';

@Component({
  selector: 'app-registration-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  public users:Users = new Users(null,null,null,null,null);
  public userCustomer:UserCustomer = new UserCustomer(null,null,null,null,null); 
  public acept:boolean = null;

  constructor(
    public router:Router,
    public serviceRouter:ServiceRouterService,
    private serviceRegistration:ServiceRegistrationService,
    private serviceLogin:ServiceLoginService,
    private dialog:MatDialog
  ) { }
onSubmit(form:any){
  const customer= {

    "customer_id":null,
    "phone":form.value.mobile,
    "name":form.value.name,
    "surname":form.value.surname,
    "photo":null,
    "mail":form.value.email,
    "password":form.value.password
  }
  this.serviceRegistration.registrationCustomer(customer)
  .subscribe((data:any)=>{
    if(data.control==true) {
      this.serviceLogin.userCustomer = new UserCustomer(
        data.data.customer_id,
        form.value.mobile,
        form.value.name,
        form.value.surname,
        null
      )
      this.serviceLogin.users = new Users(
        null,
        null,
        data.data.customer_id,
        form.value.email,
        form.value.password
      )
      localStorage.setItem('userCustomer', JSON.stringify(this.serviceLogin.userCustomer));
      localStorage.setItem('users', JSON.stringify(this.serviceLogin.users));
      console.log(this.serviceLogin.users);
      console.log(this.serviceLogin.userCustomer);
      console.log(localStorage.getItem('users'));
      console.log(localStorage.getItem('userCustomer'));
      this.serviceRouter.routerClient();
    }else {
      const dialogRef = this.dialog.open(SimpleAlertComponent);
      dialogRef.componentInstance.mensaje = "Ese correo ya está registrado, inténtalo de nuevo";
      const email:any=document.getElementById("profile");
      email.value = null;
      const password:any = document.getElementById("password");
      password.value = null;
      dialogRef.afterClosed().subscribe();
  }});} 
  ngOnInit(): void {
}}