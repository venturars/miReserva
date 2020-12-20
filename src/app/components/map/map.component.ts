import {  Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { GeocodestreetService } from 'src/app/shared/geocodestreet.service';
import { Map, tileLayer, marker, Marker } from "leaflet";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

//HAY QUE CAMBIAR QUE EL NOMBRE LO COJA DEL APISERVICE DEL RESTAURANTE
export class MapComponent implements OnInit{
  public marker:Marker;
  public map:Map;
  public restaurant: Restaurant
  constructor(private apiService:GeocodestreetService ) { 
    this.restaurant= new Restaurant("La Abuela",null,null,null,null,null,null,null,null,null,null,null,null,null);
    this.map=null;
  }


  // HAY QUE INSTALAR ESTO PARA QUE FUNCIONE
  // npm install leaflet --save
//   npm install @types/leaflet

cogeCoordenadas(){
    this.apiService.getJSONstreet().subscribe((data:any)=>{
    this.restaurant.latitude=data[0].lat;
    this.restaurant.longitude=data[0].lon;
    console.log(this.restaurant.latitude);
    console.log(this.restaurant.longitude);
      //MOSTRAR MAPA
    console.log("entra en la funcion");
    console.log(this.restaurant.latitude);
    console.log(this.restaurant.longitude);
    this.map = new Map("mapid").setView([this.restaurant.latitude,this.restaurant.longitude], 19);
  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
})
      .addTo(this.map);
      this.marker= new Marker([this.restaurant.latitude, this.restaurant.longitude]).addTo(this.map);
      this.marker.bindPopup(this.restaurant.name).openPopup();  

  })
}
  ngOnInit(): void {
    this.cogeCoordenadas();
    
  }

 

 

  

}
