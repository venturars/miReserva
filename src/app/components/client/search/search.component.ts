import { Component, OnInit } from '@angular/core';
import { ServiceSearchService } from '../../../shared/service-search.service';
import { Restaurants } from '../../../models/restaurants';
import { Map, tileLayer, Marker } from "leaflet";
import { Router } from '@angular/router';
import { ServiceRestaurantService } from '../../../shared/service-restaurant.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroComponent } from '../../modals/modal-registro/modal-registro.component';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';
@Component({
  selector: 'app-client-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public allRestaurants: Restaurants[] = new Array();
  public restaurants: Restaurants[] = new Array();
  public checked:any[] = new Array();
  public marker:any[] = new Array();
  public map:any = null;
  public rendered:any[] = new Array();
  public clicked:Restaurants;
  public renderedMarker:any[] = new Array();
  public options:object[] = [
    {
      value:"Española",
      id:"esp"
    },
    {
      value:"Mexicana",
      id:"mex"
    },
    {
      value:"Argentina",
      id:"arg"
    },
    {
      value:"Dominicana",
      id:"dmn"
    },
    {
      value:"Japonesa",
      id:"jpn"
    },
    {
      value:"China",
      id:"chn"
    },
  ];
  constructor(
    private searchService:ServiceSearchService,
    private restaurantService:ServiceRestaurantService,
    private router:Router,
    private dialog:MatDialog,
    private calendarService: ServiceCalendarService
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
      this.map = new Map("mapid").setView([40.416865 ,-3.504302], 9).setZoom(11);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Mi reserva',
        maxZoom: 18
      }).addTo(this.map);
      
      for (let i=0;i<this.restaurants.length;i++) {
        this.marker[i] = new Marker([
          this.restaurants[i].latitude,
          this.restaurants[i].longitude
        ]);
        this.map.addLayer(this.marker[i]);
        this.marker[i].bindPopup(
          this.restaurants[i].name+"<br>"+this.restaurants[i].street_name+" , " +
          this.restaurants[i].street_number
        ).on('click', () => {
          this.rendered=[];
          this.renderedMarker=[];
          this.map.setView([this.restaurants[i].latitude ,this.restaurants[i].longitude]);
          for (let i=0;i<this.marker.length;i++) {
            if(this.map.getBounds().contains(this.marker[i].getLatLng())) {
              this.rendered.push(this.restaurants[i]);
              this.renderedMarker.push(this.marker[i]);
          }}
          const position=this.rendered.indexOf(this.restaurants[i]);
          this.renderedMarker.splice(position,1);
          this.rendered.splice(position,1);
          this.rendered.unshift(this.restaurants[i]);
          this.renderedMarker.unshift(this.marker[i]);        
        }, this).openPopup();  
  }});}
  public clickCard(j:number) {
    let position:number = null;
    for (let i = 0; i < this.marker.length; i++) {
      if (this.marker[i]._popup._content==(this.rendered[j].name+"<br>"+this.rendered[j].street_name+" , " +
      this.rendered[j].street_number)) {
        position = i;
    }}
    this.map.setView([this.rendered[j].latitude ,this.rendered[j].longitude],this.map._animateToZoom)  
    this.marker[position].openPopup();
  }
  public typeOfFood(input:HTMLInputElement, label:any) {
    if(input.checked) {
      this.checked.push(input);
    } else {
      this.checked.forEach((check, index) => {
        if (check === input) {
          this.checked.splice(index, 1)
    }});}
    if (this.checked.length > 0) {
      for(let i=0;i<this.marker.length;i++) {
        this.marker[i].remove();
      }  
      this.rendered=[];
      this.marker=[];
      for (let i = 0;i < this.allRestaurants.length; i++) {
        for (let z = 0; z < this.checked.length; z++) {
          if (this.allRestaurants[i].food_type==this.checked[z].value) {
            this.rendered.push(this.allRestaurants[i]);
            this.marker.push(new Marker ([this.allRestaurants[i].latitude,this.allRestaurants[i].longitude]));
      }}}    
      this.renderedMarker=[];
      this.renderedMarker=this.marker;
      for (let i = 0; i < this.marker.length; i++) {
        this.map.addLayer(this.marker[i]);
        this.marker[i].bindPopup(
          this.rendered[i].name+"<br>"+this.rendered[i].street_name+" , " +
          this.rendered[i].street_number
        ).on('click', () => {
          this.map.setView([this.marker[i]._latlng.lat, this.marker[i]._latlng.lng]);
          this.renderedMarker=[];
          for (let i=0;i<this.marker.length;i++) {
            if(this.map.getBounds().contains(this.marker[i].getLatLng())){
              this.renderedMarker.push(this.marker[i]);
              if (this.rendered.indexOf(this.rendered[i]) == -1) {
                  this.rendered.push(this.rendered[i]);
          }}}
          let position=null;
          for (let z = 0; z < this.rendered.length; z++) {
            if (this.marker[i]._popup._content==(this.rendered[z].name+"<br>"+
            this.rendered[z].street_name+" , "+
            this.rendered[z].street_number)) {position = z;}
          }
          let rest = this.rendered[position];               
          this.rendered.splice(position,1);
          this.rendered.unshift(rest);
        }, this)
    }}else {
      for(let i=0;i<this.marker.length;i++) {
        this.marker[i].remove();
      }  
      this.rendered=[];
      this.marker=[];
      this.rendered=this.allRestaurants;
      for (let i = 0; i < this.allRestaurants.length; i++) {
        this.marker.push(new Marker ([this.allRestaurants[i].latitude,this.allRestaurants[i].longitude]));
      }
      for (let i=0;i<this.marker.length;i++) {   
        this.map.addLayer(this.marker[i]);
        this.marker[i].bindPopup(
          this.rendered[i].name+"<br>"+this.rendered[i].street_name+" , "+
          this.rendered[i].street_number
        ).on('click', () => {
          this.map.setView([this.marker[i]._latlng.lat, this.marker[i]._latlng.lng]);
          this.renderedMarker=[];
          for (let i = 0;i < this.marker.length; i++) {
            if(this.map.getBounds().contains(this.marker[i].getLatLng())) {
              this.renderedMarker.push(this.marker[i]);
              if (this.rendered.indexOf(this.rendered[i]) == -1) {
                  this.rendered.push(this.rendered[i])
          }}}
          let position=null;
          for (let z = 0; z < this.rendered.length; z++) {
            if (this.marker[i]._popup._content==(this.rendered[z].name+"<br>"+
            this.rendered[z].street_name+" , "+
            this.rendered[z].street_number)) {
              position = z;
          }}
          let rest= this.rendered[position];               
          this.rendered.splice(position,1);
          this.rendered.unshift(rest);
        }, this)
  }}}
  public toReservate(i:number) {
    this.router.navigate(['/reservation1']);
    this.restaurantService.restaurantReservation = this.restaurants[i];
    this.calendarService.getTimes(this.restaurants[i].restaurant_id)
  }
  public localSearch(searchLine:HTMLInputElement) {
    let control = false;
    for (let i = 0; i <this.restaurants.length;i++){
      if (this.restaurants[i].name.toLowerCase()==searchLine.value.toLowerCase()) {
        this.rendered=[];
        this.rendered.push(this.restaurants[i]);
        control=true;
    }}
    if (control){
      searchLine.value="";
    }else {
      const dialogRef = this.dialog.open(ModalRegistroComponent);
      dialogRef.componentInstance.mensaje="No hemos encontrado ningún restaurante con ese nombre";
      dialogRef.afterClosed().subscribe();
}}}