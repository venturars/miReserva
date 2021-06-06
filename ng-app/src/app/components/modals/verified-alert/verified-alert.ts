import { Component, OnInit } from '@angular/core';
import { ServiceRouterService } from '../../../shared/service-router.service';
import { ServiceLoginService } from '../../../shared/service-login.service';

@Component({
  selector: 'verified-alert',
  templateUrl: './verified-alert.html',
  styleUrls: ['./verified-alert.scss']
})
export class VerifiedAlertComponent implements OnInit {

  constructor(
    private serviceRouter:ServiceRouterService,
    private serviceLogin:ServiceLoginService
  ) { }
  ngOnInit(): void {
  }

  public aceptLogOut() {
    localStorage.removeItem('users');
    localStorage.removeItem('userOwner');
    localStorage.removeItem('userCustomer');
    localStorage.removeItem('userRestaurant');
    this.serviceLogin.flush();
    this.serviceRouter.routerLogin();
}}