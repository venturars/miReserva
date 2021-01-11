import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../../../shared/service-login.service';
@Component({
  selector: 'app-navbarClient',
  templateUrl: './navbarClient.component.html',
  styleUrls: ['./navbarClient.component.scss']
})
export class NavbarClientComponent implements OnInit {

  constructor(
    private router:Router,
    public serviceLogin:ServiceLoginService
    ) { }

  ngOnInit() {
  }
  public toReservationListClient() {
    this.router.navigate(["/reservations-list-client"]);
    this.serviceLogin.navCustomer = 4;
  }
  public toSearch() {
    this.router.navigate(["/search"]);
    this.serviceLogin.navCustomer = 3;
  }
  public toLogIn() {
    this.router.navigate(["/"]);
    this.serviceLogin.navCustomer = 2;
  }
  public toEditProfile() {
    this.router.navigate(["/edit-client"]);
    this.serviceLogin.navCustomer = 1;
}}