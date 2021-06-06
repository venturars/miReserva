import { Component, OnInit } from '@angular/core';
import { Restaurants } from 'src/app/models/restaurants';

@Component({
  selector: 'modal-infoRestaurant',
  templateUrl: './modal-infoRestaurant.html',
  styleUrls: ['./modal-infoRestaurant.scss']
})
export class InfoRestaurantComponent implements OnInit {
restaurant:Restaurants;
  constructor() { }

  ngOnInit() {
  }
}