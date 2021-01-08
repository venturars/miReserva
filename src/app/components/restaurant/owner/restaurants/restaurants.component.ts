import { Component, OnInit, ViewChild } from '@angular/core';
import { Restaurants } from '../../../../models/restaurants';
import { ServiceLoginService } from '../../../../shared/service-login.service';
import { ServiceRestaurantService } from '../../../../shared/service-restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-owner-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  public restaurants:Restaurants[];
  constructor(
    private serviceLogin:ServiceLoginService,
    private serviceRestaurant:ServiceRestaurantService,
    private router:Router
  ) { }

  ngOnInit() {
    this.serviceRestaurant.getRestaurantByOwner(
        this.serviceLogin.userOwner.owner_id
      ).subscribe((response) => {
        if(response.control) {
          this.restaurants = response.data;
    }});}
  public clickRestaurant(index:number) {
    console.log(index);
      this.router.navigate(['reservations-list-restaurant']);
}}