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

  constructor(private restaurantService:ServiceRestaurantService) { }

  ngOnInit(): void {

    this.map = new Map("mapid").setView([this.restaurantService.restauranteMapa.latitude ,this.restaurantService.restauranteMapa.longitude], 50)
      .setZoom(11)
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: this.restaurantService.restauranteMapa.name,
        maxZoom: 18
    }).addTo(this.map);

    this.marker= new Marker([this.restaurantService.restauranteMapa.latitude ,this.restaurantService.restauranteMapa.longitude]).addTo(this.map);
          this.marker.bindPopup(this.restaurantService.restauranteMapa.name+"<br>"+this.restaurantService.restauranteMapa.street_name+" , "+ this.restaurantService.restauranteMapa.street_number).openPopup();
          

  }

}
