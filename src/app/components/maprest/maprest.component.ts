import { Component, OnInit } from '@angular/core';
import { Map, Marker, tileLayer } from 'leaflet';
import { Restaurants } from 'src/app/models/restaurants';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';

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

    this.map = new Map("mapid").setView([this.apiRestaurants.restaurant.latitude ,this.apiRestaurants.restaurant.longitude], 50)
      .setZoom(11)
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: this.apiRestaurants.restaurant.name,
        maxZoom: 18
    }).addTo(this.map);

    this.marker= new Marker([this.apiRestaurants.restaurant.latitude ,this.apiRestaurants.restaurant.longitude]).addTo(this.map);
          this.marker.bindPopup(this.apiRestaurants.restaurant.name+"<br>"+this.apiRestaurants.restaurant.street_name+" , "+ this.apiRestaurants.restaurant.street_number)
          .on('click', function(){console.log(this)}, this).openPopup()

  }

}
