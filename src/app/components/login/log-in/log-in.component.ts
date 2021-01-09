import { Component, OnInit} from '@angular/core';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { Users } from '../../../models/users';
import { Restaurants } from '../../../models/restaurants';
import { UserOwner } from '../../../models/user-owner';
import { UserCustomer } from '../../../models/user-customer';
import { ModalUsuarioIncorrectoComponent } from '../../modals/modal-usuario-incorrecto/modal-usuario-incorrecto.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private router:Router,
    public matDialog:MatDialog
  ) { }
  onSubmit(form:any){
  this.serviceLogIn.getUsers( 
    form.value.email,
    form.value.password
  ).subscribe((response:any) => {
        
    if(response.control) {
      this.users = new Users(
        response.data[0].restaurant_id,
        response.data[0].owner_id,
        response.data[0].customer_id,
        form.value.email,
        form.value.password
      )
      if(this.users.restaurant_id) {
        this.serviceLogIn.restaurants = new Restaurants(
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
          response.data[0].ownwer_id
        )
        this.router.navigate(['/reservations-list-restaurant']);
      }else if(this.users.owner_id) {
        this.serviceLogIn.userOwner = new UserOwner(
          response.data[0].owner_id,
          response.data[0].cif,
          response.data[0].name,
          response.data[0].surname,
          response.data[0].photo
        )  
        this.router.navigate(['/restaurants-list']);
      }else if(this.users.customer_id) {
        this.serviceLogIn.userCustomer= new UserCustomer(
          response.data[0].customer_id,
          response.data[0].phone,
          response.data[0].name,
          response.data[0].surname,
          response.data[0].photo
        ) 
        this.router.navigate(['/search']);
    }}else {
    const dialogRef = this.matDialog.open(ModalUsuarioIncorrectoComponent);
      dialogRef.afterClosed().subscribe()}});
}
  ngOnInit(): void {
}}
