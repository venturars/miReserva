import { Component, OnInit } from '@angular/core';
import { Map, Marker, tileLayer } from 'leaflet';
import { Restaurants } from 'src/app/models/restaurants';
import { ServiceRestaurantService } from '../../shared/service-restaurant.service';

@Component({
  selector: 'app-maprest',
  templateUrl: './maprest.component.html',
  styleUrls: ['./maprest.component.scss']
})
export class MaprestComponent implements OnInit {
  public marker:Marker;
  public map:Map;
  public restaurants: Restaurants;

  constructor(private apiRestaurants:ServiceRestaurantService) { }

  ngOnInit(): void {

    this.map = new Map("mapid").setView([this.apiRestaurants.create1Restaurant.latitude ,this.apiRestaurants.create1Restaurant.longitude], 50)
      .setZoom(11)
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: this.apiRestaurants.create1Restaurant.name,
        maxZoom: 18
    }).addTo(this.map);

    this.marker= new Marker([this.apiRestaurants.create1Restaurant.latitude ,this.apiRestaurants.create1Restaurant.longitude]).addTo(this.map);
          this.marker.bindPopup(this.apiRestaurants.create1Restaurant.name+"<br>"+this.apiRestaurants.create1Restaurant.street_name+" , "+ this.apiRestaurants.create1Restaurant.street_number)
          

  }

}
