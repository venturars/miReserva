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
    this.serviceRouter.routerLogin();
    if (this.router.url == " ") {
      this.router.navigate[('log-in')]
    }}

  }

