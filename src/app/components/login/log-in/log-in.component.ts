import { Component, OnInit} from '@angular/core';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { Users } from '../../../models/users';
import { Restaurants } from '../../../models/restaurants';
import { UserOwner } from '../../../models/user-owner';
import { UserCustomer } from '../../../models/user-customer';
import { MatDialog } from '@angular/material/dialog';
import { SimpleAlertComponent } from '../../modals/simple-alert/simple-alert';
import { ServiceCalendarService } from '../../../shared/service-calendar.service';
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
    private serviceCalendar:ServiceCalendarService,
    public matDialog:MatDialog
  ) { }
  onSubmit(form:any) {
  this.serviceLogIn.getUsers( 
    form.value.email,
    form.value.password
  ).subscribe((response:any) => {
        
    if(response.control) {
      this.serviceLogIn.users = new Users(
        response.data[0].restaurant_id,
        response.data[0].owner_id,
        response.data[0].customer_id,
        form.value.email,
        form.value.password
      );
      if(this.serviceLogIn.users.restaurant_id) {
        this.serviceLogIn.userRestaurant = new Restaurants(
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
          null
        )
        this.serviceCalendar.restaurantId = response.data[0].restaurant_id;
        this.serviceRouter.routerRestaurant();
      }else if(this.serviceLogIn.users.owner_id) {
        this.serviceLogIn.userOwner = new UserOwner(
          response.data[0].owner_id,
          response.data[0].cif,
          response.data[0].name,
          response.data[0].surname,
          response.data[0].photo
          );
        this.serviceRouter.routerOwner();
      }else if(this.serviceLogIn.users.customer_id) {
        this.serviceLogIn.userCustomer= new UserCustomer(
          response.data[0].customer_id,
          response.data[0].phone,
          response.data[0].name,
          response.data[0].surname,
          response.data[0].photo
        );
        this.serviceRouter.routerClient();
    }}else {
      
      const dialogRef = this.matDialog.open(SimpleAlertComponent,{panelClass: ['animate__animated','animate__backInDown']});
      dialogRef.componentInstance.mensaje="Tu usuario o contraseña son incorrectos";
      dialogRef.componentInstance.imagen="..//..//..//..//assets/null.svg";
      
      dialogRef.afterClosed().subscribe()
    {}
  }});
}
  ngOnInit(): void {
}}