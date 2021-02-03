import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceRouterService } from '../shared/service-router.service';
import { Users } from '../models/users';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'miReserva';
  public users:any = (JSON.parse(localStorage.getItem('users')))?JSON.parse(localStorage.getItem('users')):new Users(null,null,null,null,null);
  constructor (
    public router:Router,
    public serviceRouter:ServiceRouterService
    ){ }
  ngOnInit() {

    if (localStorage.getItem(this.users)) {
      this.serviceRouter.routerLogin();
      if (this.router.url == " ") {
        this.router.navigate[('log-in')]
      }}}

  }

