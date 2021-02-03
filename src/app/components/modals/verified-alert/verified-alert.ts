import { Component, OnInit } from '@angular/core';
import { ServiceRouterService } from '../../../shared/service-router.service';

@Component({
  selector: 'verified-alert',
  templateUrl: './verified-alert.html',
  styleUrls: ['./verified-alert.scss']
})
export class VerifiedAlertComponent implements OnInit {

  constructor(
    private serviceRouter:ServiceRouterService
  ) { }
  ngOnInit(): void {
  }

  public aceptLogOut() {
    localStorage.removeItem('users');
    localStorage.removeItem('userOwner');
    localStorage.removeItem('userCustomer');
    localStorage.removeItem('userRestaurant');
    this.serviceRouter.routerLogin();
}}