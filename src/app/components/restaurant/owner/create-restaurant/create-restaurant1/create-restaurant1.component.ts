import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { Restaurants } from 'src/app/models/restaurants';
import { Restmailpassword } from 'src/app/models/restmailpassword';
import { GeocodestreetService } from 'src/app/shared/geocodestreet.service';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';

@Component({
  selector: 'app-restaurant-owner-CreateRestaurant1',
  templateUrl: './create-restaurant1.component.html',
  styleUrls: ['./create-restaurant1.component.scss']
})
export class CreateRestaurant1Component implements OnInit {
  
  public restaurant:Restaurant;
  public restaurantmodel:Restaurants;
  public banner:any;
  public logo:any;
  public restmailpassword:Restmailpassword;
  public restauranteCreado:any;
  public latitud:any;
  public longitud:any;
  public url:any;

  constructor(public router:Router,
              public serviceLogIn:ServiceLoginService,
              public serviceRestaurant:ServiceRestaurantService,
              public geoservice:GeocodestreetService) {
    this.restaurant= new Restaurant (null,null,null,null,null,null,null,null,null,null);
    this.restaurantmodel= new Restaurants (null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    this.restaurant.banner=null;
    this.restaurant.logo=null;
    this.restauranteCreado=null
    
   }
   processBanner(imageInput:any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
    //const imagen=document.getElementById("mostrarbanner").setAttribute("src", event.target.result);
    this.restaurant.banner=null;
    this.restaurant.banner="assets/photos/" +file.name;
    const imagen=document.getElementById("mostrarbanner").setAttribute("src", this.restaurant.banner);
  })
  reader.readAsDataURL(file);
}
processLogo(imageInput: any) {
  const file: File = imageInput.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', (event: any) => {
 // const imagen=document.getElementById("mostrarlogo").setAttribute("src", event.target.result);
 this.restaurant.logo=null;
  this.restaurant.logo="assets/photos/" +file.name;
  const imagen=document.getElementById("mostrarlogo").setAttribute("src", this.restaurant.logo);
})
reader.readAsDataURL(file);
}

  
   onSubmit(restForm){
     // SE CREA RESTAURANTE
    const nuevorestaurante:Restmailpassword= new Restmailpassword 
    (1,restForm.value.name, restForm.value.province, restForm.value.city, restForm.value.street_name,
       restForm.value.street_number, restForm.value.postal_code,restForm.value.phone,restForm.value.capacity, restForm.value.food_type,this.restaurant.banner,this.restaurant.logo,null,restForm.value.url,null,null,
       this.serviceLogIn.userOwner.owner_id, restForm.value.mail, restForm.value.password);     
    this.serviceRestaurant.postRestaurant(nuevorestaurante)
    .subscribe((data:any) => {  
      
      // SE CALCULA LONGITUD Y LATITUD CON LA API
      
      this.restauranteCreado=data.data.restaurant_id;
        // console.log(this.restauranteCreado);
          this.geoservice.getJSONstreet(this.url).subscribe((data:any)=>{
          this.latitud=data[0].lat;
          this.longitud=data[0].lon;
        
      //SE ACTUALIZA EL RESTAURANTE CON LATITUD Y LONGITUD    
          nuevorestaurante.restaurant_id=this.restauranteCreado;
          this.serviceRestaurant.id_restaurant=nuevorestaurante.restaurant_id;
          nuevorestaurante.latitude=this.latitud;
          nuevorestaurante.longitude=this.longitud;
          
          console.log(nuevorestaurante);
          this.serviceRestaurant.putRestaurant(nuevorestaurante)
          .subscribe(data=> {
            console.log(data)
          })              
        })

  });
    
    this.restaurant.addressnumber=restForm.value.street_number;
    this.restaurant.address=restForm.value.street_name;
    this.restaurant.city=restForm.value.city;
    this.url="https://nominatim.openstreetmap.org/search?q="+this.restaurant.addressnumber+",+"+this.restaurant.address.replace(" ","+")+",+"+this.restaurant.city+"&format=json&addressdetails=1&limit=1&polygon_svg=1";
        
    
     this.router.navigate(["/create-restaurant-2"]);
   }

  ngOnInit(): void {
    // this.router.navigate(['navbar1'])
  }

}
