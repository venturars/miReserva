import { Component, OnInit} from '@angular/core';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { Users } from '../../../models/users';
import { Restaurants } from '../../../models/restaurants';
import { UserOwner } from '../../../models/user-owner';
import { UserCustomer } from '../../../models/user-customer';
import { MatDialog } from '@angular/material/dialog';
import { SimpleAlertComponent } from '../../modals/simple-alert/simple-alert';
import { ServiceRouterService } from '../../../shared/service-router.service';
@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  public users:Users = new Users(null,null,null,null,null);
  public remember:boolean = null;

  constructor(
    private serviceLogIn:ServiceLoginService,
    public serviceRouter:ServiceRouterService,
    public matDialog:MatDialog
  ) { }
  ngOnInit():void {
  }
  onSubmit(form:any) {
  this.serviceLogIn.getUsers( 
    form.value.email,
    form.value.password
  ).subscribe((response:any) => {
        
    if(response.control) {
      let users:Users = new Users(
        response.data[0].restaurant_id,
        response.data[0].owner_id,
        response.data[0].customer_id,
        form.value.email,
        form.value.password
      );
      localStorage.setItem('users', JSON.stringify(users));
      if(users.restaurant_id) {
        let userRestaurant:Restaurants = new Restaurants(
          response.data[0].restaurant_id,
          response.data[0].name,
          response.data[0].province,
          response.data[0].city,
          response.data[0].street_name,
          response.data[0].street_number,
          response.data[0].postal_code,
          response.data[0].phone,
          response.data[0].capacity,
          response.data[0].food_type,
          response.data[0].header,
          response.data[0].logo,
          response.data[0].menu,
          response.data[0].url,
          response.data[0].latitude,
          response.data[0].longitude,
          response.data[0].owner_id,
        )
        localStorage.setItem('userRestaurant', JSON.stringify(userRestaurant));
        this.serviceRouter.routerRestaurant();
      }else if(users.owner_id) {
        let userOwner:UserOwner = new UserOwner(
          response.data[0].owner_id,
          response.data[0].cif,
          response.data[0].name,
          response.data[0].surname,
          response.data[0].photo
          );
        localStorage.setItem('userOwner', JSON.stringify(userOwner));
        this.serviceRouter.routerOwner();
      }else if(users.customer_id) {
        let userCustomer:UserCustomer = new UserCustomer(
          response.data[0].customer_id,
          response.data[0].phone,
          response.data[0].name,
          response.data[0].surname,
          response.data[0].photo
        );
        localStorage.setItem('userCustomer', JSON.stringify(userCustomer));
        this.serviceRouter.routerClient();
    }}else {
      let password:any = document.getElementById("password");
      password.value = "";
      const dialogRef = this.matDialog.open(SimpleAlertComponent,{panelClass: ['animate__animated','animate__backInDown']});
      dialogRef.componentInstance.mensaje="Tu usuario o contraseña son incorrectos";
      dialogRef.componentInstance.imagen="/assets/null.svg";
      dialogRef.afterClosed().subscribe();
}});}}