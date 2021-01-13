import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceSearchService } from '../../../shared/service-search.service';
import { Restaurants } from '../../../models/restaurants';
import { Map, tileLayer, marker, Marker } from "leaflet";
import { GeocodestreetService } from 'src/app/shared/geocodestreet.service';
import { Router } from '@angular/router';
import { ServiceRestaurantService } from '../../../shared/service-restaurant.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroComponent } from '../../modals/modal-registro/modal-registro.component';
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
  public marker:any[] = new Array();
  public map:any = null;
  public rendered:any[]=[];
  public clicked:Restaurants;
  public renderedMarker:any[]=[];
 
  constructor(
    private searchService:ServiceSearchService,
    private restaurantService:ServiceRestaurantService,
    private router:Router,
    private dialog:MatDialog
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
        ])
        this.map.addLayer(this.marker[i])
        
        this.marker[i].bindPopup(
          this.restaurants[i].name+"<br>"+this.restaurants[i].street_name+" , "+
          this.restaurants[i].street_number
        )
        
        
        .on('click', function(){
          console.log("hola");
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
          console.log(posicion);
          console.log(this.restaurants[i]);
          console.log(this.rendered)
          this.renderedMarker.splice(posicion,1);
          this.rendered.splice(posicion,1);
          this.rendered.unshift(this.restaurants[i]);
          this.renderedMarker.unshift(this.marker[i]);        
          
        }, this).openPopup()  
         
          
          
      }});
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
      
  }
  this.tipodecomida();
}

  public clickcard(restaurant,i){
       let posicion:number=null;
       console.log(this.marker);
       console.log(restaurant.name);
    for (let i=0;i<this.marker.length;i++){
      console.log(this.marker[i]._popup._content)
      if (this.marker[i]._popup._content==(restaurant.name+"<br>"+restaurant.street_name+" , "+
      restaurant.street_number)){
        posicion=i;
        console.log(i);
        console.log(this.marker[i]);
      }
    }

    this.map.setView([restaurant.latitude ,restaurant.longitude],this.map._animateToZoom)  
    this.marker[posicion].openPopup();
    console.log(this.marker);
    console.log(this.rendered);

  }

  tipodecomida(){

    if (this.checked.length>0)
    {
    
       //Borrando markers de la última busqueda
 
       for(let i=0;i<this.marker.length;i++) {
        this.marker[i].remove();
}  
    this.rendered=[];
    this.marker=[];
    
        for (let i=0;i<this.allRestaurants.length;i++){
          for (let z=0;z<this.checked.length;z++){
              if (this.allRestaurants[i].food_type==this.checked[z].value){
                this.rendered.push(this.allRestaurants[i])
                this.marker.push(new Marker ([this.allRestaurants[i].latitude,this.allRestaurants[i].longitude]))
                
                
              }
          }
        }    
        this.renderedMarker=[];
        this.renderedMarker=this.marker;

            for (let i=0;i<this.marker.length;i++){   
              this.map.addLayer(this.marker[i])
              this.marker[i].bindPopup(
                this.rendered[i].name+"<br>"+this.rendered[i].street_name+" , "+
                this.rendered[i].street_number
              )
              
            .on('click', function(){
                  
                    
                         

                  this.map.setView([this.marker[i]._latlng.lat, this.marker[i]._latlng.lng])
                  
                  
                  // // mira que markers se estan mostrando en el mapa y los añade a rendered que
                  // // que es el ngfor de las tarjetas que se visualizan
                  this.renderedMarker=[];
                  for (let i=0;i<this.marker.length;i++){
                    if(this.map.getBounds().contains(this.marker[i].getLatLng())){
                  this.renderedMarker.push(this.marker[i]);
                      if (this.rendered.indexOf(this.rendered[i])==-1){
                          this.rendered.push(this.rendered[i])
                      }
                    }
                }
                
                
                
                  
                      
                  
                  // cambia para que se muestre el primero de la lista el restaurante seleccionado
                let posicion=null;
                console.log (this.rendered);
                  for (let z=0;z<this.rendered.length;z++){
                    if (this.marker[i]._popup._content==(this.rendered[z].name+"<br>"+this.rendered[z].street_name+" , "+
                    this.rendered[z].street_number)){
                      posicion=z;
                      console.log(posicion)
                    }

                  }
                  let rest= this.rendered[posicion];               
                  // this.renderedMarker.splice(posicion,1);
                  this.rendered.splice(posicion,1);
                  this.rendered.unshift(rest);
                  // this.renderedMarker.unshift(this.marker[i]);        
                 
                }, this)

              }  
                   
    }

    else{

      for(let i=0;i<this.marker.length;i++) {
        this.marker[i].remove();
      }  
    this.rendered=[];
    this.marker=[];

      this.rendered=this.allRestaurants;
      for (let i=0;i<this.allRestaurants.length;i++){
      this.marker.push(new Marker ([this.allRestaurants[i].latitude,this.allRestaurants[i].longitude]))
      }

      for (let i=0;i<this.marker.length;i++){   
        this.map.addLayer(this.marker[i])
        this.marker[i].bindPopup(
          this.rendered[i].name+"<br>"+this.rendered[i].street_name+" , "+
          this.rendered[i].street_number
        )
        .on('click', function(){
                  
                    
                         

          this.map.setView([this.marker[i]._latlng.lat, this.marker[i]._latlng.lng])
          
          
          // // mira que markers se estan mostrando en el mapa y los añade a rendered que
          // // que es el ngfor de las tarjetas que se visualizan
          this.renderedMarker=[];
          for (let i=0;i<this.marker.length;i++){
            if(this.map.getBounds().contains(this.marker[i].getLatLng())){
          this.renderedMarker.push(this.marker[i]);
              if (this.rendered.indexOf(this.rendered[i])==-1){
                  this.rendered.push(this.rendered[i])
              }
            }
        }
        
        
        
          
              
          
          // cambia para que se muestre el primero de la lista el restaurante seleccionado
        let posicion=null;
        console.log (this.rendered);
          for (let z=0;z<this.rendered.length;z++){
            if (this.marker[i]._popup._content==(this.rendered[z].name+"<br>"+this.rendered[z].street_name+" , "+
            this.rendered[z].street_number)){
              posicion=z;
              console.log(posicion)
            }

          }
          let rest= this.rendered[posicion];               
          // this.renderedMarker.splice(posicion,1);
          this.rendered.splice(posicion,1);
          this.rendered.unshift(rest);
          // this.renderedMarker.unshift(this.marker[i]);        
         
        }, this)

      }
    } 
  }

  //-----Functions-----
  public toReservate(restaurant,i:number) {
    this.router.navigate(['/reservation1'])
    this.restaurantService.restaurantReservation = this.restaurants[i];
  }
  public localSearch(texto) {
    let control=false;
    console.log(this.restaurants);
    for (let i=0;i<this.restaurants.length;i++){
      if (this.restaurants[i].name.toLowerCase()==texto.value.toLowerCase()){
        console.log(this.restaurants[i].name);
        this.rendered=[];
        this.rendered.push(this.restaurants[i])
        control=true;
      }
    }

    if (control){
      console.log("si");
      texto.value="";
    }

    else{
      const dialogRef = this.dialog.open(ModalRegistroComponent);
      dialogRef.componentInstance.mensaje="No hemos encontrado ningún restaurante con ese nombre";
  dialogRef.afterClosed().subscribe(result => {
  console.log(`Dialog result: ${result}`);})
    }

    }
 

}



//-----Desing funcitons-----