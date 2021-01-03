import {  Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { GeocodestreetService } from 'src/app/shared/geocodestreet.service';
import { Map, tileLayer, marker, Marker } from "leaflet";
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';
import { Restaurants } from 'src/app/models/restaurants';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

//HAY QUE CAMBIAR QUE EL NOMBRE LO COJA DEL APISERVICE DEL RESTAURANTE
export class MapComponent implements OnInit{
  public marker:Marker[];
  public map:Map;
  public restaurant: Restaurant
  public restaurants: Restaurants[];

  constructor(private apiService:GeocodestreetService, private apiRestaurants:ServiceRestaurantService ) { 
    this.restaurant= new Restaurant("La Abuela",null,null,null,null,null,null,null,null,null,null,null,40.416865 ,-3.504302);
    this.restaurants=[];
    this.map=null;
    this.marker=[];
  }


  // HAY QUE INSTALAR ESTO PARA QUE FUNCIONE
  // npm install leaflet --save
//   npm install @types/leaflet

  ngOnInit(): void {
    
    this.apiRestaurants.getRestaurants()
    .subscribe((data:any)=>{console.log(data)
      this.restaurants=data.data;

      this.map = new Map("mapid").setView([this.restaurant.latitude,this.restaurant.longitude], 50)
      .setZoom(11)
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: 'Mi reserva',
        maxZoom: 18
    })
          .addTo(this.map);
          for (let i=0;i<this.restaurants.length;i++){
           
          this.marker[i]= new Marker([this.restaurants[i].latitude, this.restaurants[i].longitude]).addTo(this.map);
          this.marker[i].bindPopup(this.restaurants[i].name+"<br>"+this.restaurants[i].street_name+" , "+ this.restaurants[i].street_number)
          .on('click', function(){console.log(this.restaurants[i])}, this).openPopup()
           
        }

            //LA FUNCION ON CLICK DE LA LINEA 52 es LA QUE PERMITE SELECCIONAR UN RESTAURANTE DE LOS MARCADORES
            //ES LA QUE TIENES QUE USAR PARA SELECCIONARLO DESDE EL MAPA
    });
    
  }

 

 

  

}
