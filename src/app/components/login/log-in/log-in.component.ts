import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Restaurants } from 'src/app/models/restaurants';
import { UserCustomer } from 'src/app/models/user-customer';
import { UserOwner } from 'src/app/models/user-owner';
import { Users } from 'src/app/models/users';
import { ServiceLoginService } from 'src/app/shared/service-login.service';

import { User } from 'src/app/models/user';



@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  public user:User;
  constructor(
    public router: Router,
    public serviceLogIn:ServiceLoginService
    ) {
    this.user= new User(null,null,null,null,null,null);
   }
onSubmit(form:any){
  
  this.serviceLogIn.getUsers( 
    form.value.email,
    form.value.password
  )
  
  if(this.serviceLogIn.control === 0){
    this.router.navigate(['/']);
  }else if(this.serviceLogIn.control === 1){
    this.router.navigate(['/reservations-list-restaurant']);
  }else if(this.serviceLogIn.control == 2){
    this.router.navigate(['/restaurants-list']);
  }else if(this.serviceLogIn.control == 3){
    this.router.navigate(['/search']);
  }
}
  ngOnInit(): void {
  }

}
