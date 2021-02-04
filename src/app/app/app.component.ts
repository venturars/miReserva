import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../shared/service-login.service';
import { ServiceRouterService } from '../shared/service-router.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'miReserva';
  constructor (
    public router:Router,
    public serviceLogin:ServiceLoginService,
    public serviceRouter:ServiceRouterService
    ){ }
  ngOnInit() {
    this.serviceLogin.flush();
    if(this.serviceLogin.users.owner_id) {
      this.serviceRouter.routerOwner();
    }else if(this.serviceLogin.users.customer_id) {
      this.serviceRouter.routerClient();
    }else if(this.serviceLogin.users.restaurant_id) {
      this.serviceRouter.routerRestaurant();
    }else {this.serviceRouter.routerLogin();}
  }
}