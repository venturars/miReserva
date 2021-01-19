import { Component, OnInit } from '@angular/core';
import { Restaurants } from '../../../../models/restaurants';
import { ServiceLoginService } from '../../../../shared/service-login.service';
import { ServiceRestaurantService } from '../../../../shared/service-restaurant.service';
import { ServiceRouterService } from '../../../../shared/service-router.service';
import { Router } from '@angular/router';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';

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
    private serviceCalendar:ServiceCalendarService,
    public serviceRouter:ServiceRouterService,
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
    this.serviceRestaurant.selectedRestaurant = this.restaurants[index];
    this.serviceCalendar.restaurantId = this.restaurants[index].restaurant_id;
    
    this.serviceCalendar.getTimes(this.restaurants[index].restaurant_id)
    this.router.navigate(['/reservations-list-restaurant']);
}}