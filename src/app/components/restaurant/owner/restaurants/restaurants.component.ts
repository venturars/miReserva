import { Component, OnInit } from '@angular/core';
import { Restaurants } from '../../../../models/restaurants';
import { ServiceLoginService } from '../../../../shared/service-login.service';
import { ServiceRestaurantService } from '../../../../shared/service-restaurant.service';

@Component({
  selector: 'app-restaurant-owner-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  public restaurants:Restaurants[];
  constructor(
    private serviceLogin:ServiceLoginService,
    private serviceRestaurant:ServiceRestaurantService
  ) { }

  ngOnInit() {
    // this.restaurants = this.serviceRestaurant.getRestaurant
  }

}