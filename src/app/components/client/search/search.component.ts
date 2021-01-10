import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceSearchService } from '../../../shared/service-search.service';
import { Restaurants } from '../../../models/restaurants';
import { Map, tileLayer, marker, Marker } from "leaflet";
import { GeocodestreetService } from 'src/app/shared/geocodestreet.service';
import { Router } from '@angular/router';
import { ServiceRestaurantService } from '../../../shared/service-restaurant.service';
@Component({
  selector: 'app-client-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchline') searchLine: ElementRef;

  public allRestaurants: Restaurants[] = new Array();
  public restaurants: Restaurants[] = new Array();
  public checked:any[] = new Array();
  public marker:Marker[] = new Array();
  public map:any = null;
  public rendered:any[]=[];
  public clicked:Restaurants;
  public renderedMarker:any[]=[];
  constructor(
    private searchService:ServiceSearchService,
    private restaurantService:ServiceRestaurantService,
    private router:Router
  ) { }

  ngOnInit() {
    this.searchService.initialSearch().subscribe((data:any) => {
      for(let i = 0; i < data.data.length; i++) {
        this.allRestaurants.push(new Restaurants(
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
      this.restaurants = this.allRestaurants;
      this.rendered=this.restaurants;
      this.map = new Map("mapid").setView([40.416865 ,-3.504302], 9)
      .setZoom(11)
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: 'Mi reserva',
        maxZoom: 18
      }).addTo(this.map)
      
      for (let i=0;i<this.restaurants.length;i++){
        this.marker[i] = new Marker([
          this.restaurants[i].latitude,
          this.restaurants[i].longitude
        ]).addTo(this.map)
        
        this.marker[i].bindPopup(
          this.restaurants[i].name+"<br>"+this.restaurants[i].street_name+" , "+
          this.restaurants[i].street_number
        )
        
        
        .on('click', function(){
          this.rendered=[];
          this.renderedMarker=[];
          this.map.setView([this.restaurants[i].latitude ,this.restaurants[i].longitude])  
          // mira que markers se estan mostrando en el mapa y los añade a rendered que
          // que es el ngfor de las tarjetas que se visualizan
          for (let i=0;i<this.marker.length;i++){
            if(this.map.getBounds().contains(this.marker[i].getLatLng())){
              this.rendered.push(this.restaurants[i]);
              this.renderedMarker.push(this.marker[i]);
            }
          }
          //cambia para que se muestre el primero de la lista el restaurante seleccionado
          const posicion=this.rendered.indexOf(this.restaurants[i]);
          this.renderedMarker.splice(posicion,1);
          this.rendered.splice(posicion,1);
          this.rendered.unshift(this.restaurants[i]);
          this.renderedMarker.unshift(this.marker[i]);        
          
        }, this).openPopup()  
         
          
          
      }});
  }

  //-----Design-----
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

  public clickcard(restaurant,i){
    
    this.map.setView([restaurant.latitude ,restaurant.longitude],this.map._animateToZoom)  
    this.renderedMarker[i].openPopup();
console.log(restaurant);
console.log(i);
  }
  //-----Functions-----
  public toReservate(restaurant,i:number) {
    this.router.navigate(['/reservation1'])
    this.restaurantService.restaurantReservation = this.restaurants[i];
  }
  public localSearch() {

    let sumRestaurants:number = this.allRestaurants.length;
    let sumTypes:number;
    this.restaurants = new Array();

    if(this.checked) {
      sumTypes = this.checked.length;
    }else {
      sumTypes = 0;
    }
    
    for(let i = 0; i < sumRestaurants; i++) {

      for(let j = 0; j < sumTypes; i++) {

        if(this.allRestaurants[i].food_type == this.checked[j].value) {
          this.restaurants.push(this.allRestaurants[i]);
      }}

      if(this.allRestaurants[i].name == this.searchLine.nativeElement.value) {

        let total:number;

        if(this.restaurants) {

          total = this.restaurants.length;

        }else {
          total = 0;
        }

        for(let k = 0; k > total; i++) {

          if(this.allRestaurants[i] != this.restaurants[k]) {
            this.restaurants.push(this.allRestaurants[i]);
          }
        }
      }
    }
  }
}



//-----Desing funcitons-----