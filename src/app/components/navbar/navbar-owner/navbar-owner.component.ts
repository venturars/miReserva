import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../../../shared/service-login.service';

@Component({
  selector: 'app-navbarOwner',
  templateUrl: './navbar-owner.component.html',
  styleUrls: ['./navbar-owner.component.scss']
})
export class NavbarOwnerComponent implements OnInit {

  constructor(
    private router:Router,
    public serviceLogin:ServiceLoginService
  ) { }

  ngOnInit(): void {
  }
  public toCreateRestaurant1() {
    this.router.navigate(["/create-restaurant-1"]);
    this.serviceLogin.navOwner = 1;
  }
  public toRestaurantsList() {
    this.router.navigate(["/restaurants-list"]);
    this.serviceLogin.navOwner = 2;
  }
  public toLogIn() {
    this.router.navigate(["/"]);
    this.serviceLogin.navOwner = 3;
  }
  public toEditProfile() {
    this.router.navigate(["/edit-owner"]);
    this.serviceLogin.navOwner = 4;
}}