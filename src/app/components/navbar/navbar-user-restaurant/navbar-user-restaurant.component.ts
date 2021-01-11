import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../../../shared/service-login.service';
@Component({
  selector: 'app-navbarUserRestaurant',
  templateUrl: './navbar-user-restaurant.component.html',
  styleUrls: ['./navbar-user-restaurant.component.scss']
})
export class NavbarUserRestaurantComponent implements OnInit {

  public nav:number = 2;

  constructor(
    private router:Router,
    public serviceLogin:ServiceLoginService
    ) { }

  ngOnInit() {

  }
  public toLogIn() {
    this.router.navigate(["/"]);
    this.nav = 1;
  }
  public toReservationListRestaurant() {
    this.router.navigate(["/reservations-list-restaurant"]);
    this.nav = 2;
  }
}
