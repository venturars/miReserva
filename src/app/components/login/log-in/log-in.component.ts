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
  console.log(form.value);
  /* this.serviceLogIn.getUsers() */




  // routerLink al componente deseado desde el ts
  this.router.navigate(['/search'])
}
  ngOnInit(): void {
  }

}
