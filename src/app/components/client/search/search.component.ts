import { Component, OnInit } from '@angular/core';
import { ServiceSearchService } from '../../../shared/service-search.service';
import { Restaurants } from '../../../models/restaurants';
import { Map, tileLayer, marker, Marker } from "leaflet";
import { GeocodestreetService } from 'src/app/shared/geocodestreet.service';
@Component({
  selector: 'app-client-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public restaurants: Restaurants[] = new Array();
  public checked:any[] = new Array();
  public marker:Marker[] = [];
  public map:Map = null;
  constructor(
    private searchService:ServiceSearchService,
    private apiService:GeocodestreetService
  ) { }

  ngOnInit() {
    this.searchService.initialSearch().subscribe((data:any) => {
      
      for(let i = 0; i < data.data.length; i++) {
        this.restaurants.push(new Restaurants(
          data.data[i].restaurant_id,
          data.data[i].name,
          data.data[i].province,
          data.data[i].city,
          data.data[i].street_name,
          data.data[i].street_number,
          data.data[i].postal_code,
          data.data[i].phone,
          data.data[i].capacity,
          data.data[i].food_type,
          data.data[i].header,
          data.data[i].logo,
          data.data[i].menu,
          data.data[i].url,
          data.data[i].latitude,
          data.data[i].longitude,
          data.data[i].owner_id
      ));}
      this.map = new Map("mapid").setView([40.416865 ,-3.504302], 50)
      .setZoom(11)
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: 'Mi reserva',
        maxZoom: 18
      }).addTo(this.map);
      for (let i=0;i<this.restaurants.length;i++){
             
        this.marker[i]= new Marker([this.restaurants[i].latitude, this.restaurants[i].longitude]).addTo(this.map);
        this.marker[i].bindPopup(this.restaurants[i].name+"<br>"+this.restaurants[i].street_name+" , "+ this.restaurants[i].street_number)
        .on('click', function(){console.log(this.restaurants[i])}, this).openPopup()  
      }
    });
  }
  public showOptions() {
    let options:any = document.getElementById('options');
    let hide:any = document.getElementById('hideOptions');
    let filters:any = document.getElementsByClassName('filters')[0];
    if(options.style.display === "flex") {
      options.style.display = "none";
      hide.style.display = "none";
      if(filters) {
        filters.style.visibility = "visible";
      }
    }else {
      options.style.display = "flex";
      hide.style.display = "flex";
      if(filters) {
        filters.style.visibility = "hidden";
      }
  }}
  public hideOptions() {
    let options:any = document.getElementById('options');
    let hide:any = document.getElementById('hideOptions');
    let filters:any = document.getElementsByClassName('filters')[0];
    if(options.style.display === "flex") {
      options.style.display = "none";
      hide.style.display = "none";
      if(filters) {
        filters.style.visibility = "visible";
      }
    }
  }
  public asign(value:string) {
    let input:any = document.getElementById(value);
    let label1:any = document.getElementsByClassName(value)[0];
    if(input.checked) {
      this.checked.push(document.getElementById(value));
      label1.style.cssText =
        "background: var(--primaryColor); color: var(--primaryColorOpposite)";
    } else {
      label1.style.cssText = "";
      this.checked.forEach((check, index) => {
        if (check === document.getElementById(value)) {
          this.checked.splice(index, 1)
        }
      })
  }}
  public search() {

  }
}
//-----Desing funcitons-----