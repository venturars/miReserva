import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarUserRestaurant',
  templateUrl: './navbar-user-restaurant.component.html',
  styleUrls: ['./navbar-user-restaurant.component.scss']
})
export class NavbarUserRestaurantComponent implements OnInit {

  constructor(
    private router:Router
    ) { }

  ngOnInit(): void {
  }
  public toLogIn() {
    this.router.navigate(["/"]);
  }
  public toReservationListRestaurant() {
    this.router.navigate(["/reservations-list-restaurant"]);
  }
}
