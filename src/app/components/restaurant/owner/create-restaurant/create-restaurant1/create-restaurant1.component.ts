import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Restaurants } from 'src/app/models/restaurants';
import { GeocodestreetService } from 'src/app/shared/geocodestreet.service';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { ServiceRegistrationService } from 'src/app/shared/service-registration.service';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';
import { Users } from '../../../../../models/users';
import { SimpleAlertComponent } from '../../../../modals/simple-alert/simple-alert';

@Component({
  selector: 'app-restaurant-owner-CreateRestaurant1',
  templateUrl: './create-restaurant1.component.html',
  styleUrls: ['./create-restaurant1.component.scss']
})
export class CreateRestaurant1Component implements OnInit {
  
  public users:Users = new Users(null,null,null,null,null);
  public restaurantmodel:Restaurants;
  public banner:any;
  public logo:any;
  public restauranteCreado:any;
  public latitud:any;
  public longitud:any;
  public url:string;

  constructor(
    public router:Router,
    public serviceLogIn:ServiceLoginService,
    public serviceRestaurant:ServiceRestaurantService,
    public geoservice:GeocodestreetService,
    public serviceRegistration:ServiceRegistrationService,
    public dialog:MatDialog
  ) {
    this.restaurantmodel= new Restaurants (null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    this.restaurantmodel.header=null;
    this.restaurantmodel.logo=null;
    this.restauranteCreado=null;
  }
  public processBanner(imageInput:any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
    //const imagen=document.getElementById("mostrarbanner").setAttribute("src", event.target.result);
    this.restaurantmodel.header=null;
    this.restaurantmodel.header="assets/photos/" +file.name;
    const imagen=document.getElementById("mostrarbanner").setAttribute("src", this.restaurantmodel.header);
    });
    reader.readAsDataURL(file);
  }
  public processLogo(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
    // const imagen=document.getElementById("mostrarlogo").setAttribute("src", event.target.result);
    this.restaurantmodel.logo=null;
    this.restaurantmodel.logo="assets/photos/" +file.name;
    const imagen=document.getElementById("mostrarlogo").setAttribute("src", this.restaurantmodel.logo);
    });
    reader.readAsDataURL(file);
  }
  public onSubmit(restForm:any) {
    
    // SE CREA RESTAURANTE

    const sendRestaurant:Restaurants = new Restaurants(
      1,restForm.value.name, restForm.value.province, restForm.value.city, restForm.value.street_name,
       restForm.value.street_number, restForm.value.postal_code,restForm.value.phone,restForm.value.capacity,
       restForm.value.food_type,this.restaurantmodel.header,this.restaurantmodel.logo,null,restForm.value.url,
       null,null,this.serviceLogIn.userOwner.owner_id
    );     
    this.serviceRestaurant.capacity=restForm.value.capacity;
    this.serviceRegistration.checkMailFree(restForm.value.mail)
    .subscribe((data:any)=>{
      if (data.control==true){
        console.log(sendRestaurant);
        this.serviceRestaurant.postRestaurant(
          sendRestaurant,
          restForm.value.mail,
          restForm.value.password
          ).subscribe((data:any) => {  
            
          // SE CALCULA LONGITUD Y LATITUD CON LA API
      
          this.restauranteCreado=data.data.restaurant_id;
          this.geoservice.getJSONstreet(this.url)
          .subscribe((data:any)=> {
            console.log(data);
            
            if (data[0].lat=="") {
              //EN ESTE IF ES CUANDO HA FALLADO LA LOCALIZACION Y HABRIA QUE METERSELAS O PREGUNTARLE POR ELLAS
              console.log("entra aqui");
              }
            else
            {
              this.latitud=data[0].lat;
              this.longitud=data[0].lon;
            }
            //SE ACTUALIZA EL RESTAURANTE CON LATITUD Y LONGITUD    
            

              sendRestaurant.restaurant_id=this.restauranteCreado;
             
              this.serviceRestaurant.id_restaurant=sendRestaurant.restaurant_id;
              sendRestaurant.latitude=this.latitud;
              sendRestaurant.longitude=this.longitud;
                          this.serviceRestaurant.create1Restaurant=sendRestaurant;
              
              this.serviceRestaurant.putRestaurant2(sendRestaurant)
              .subscribe();              
        });});
        const dialogRef = this.dialog.open(SimpleAlertComponent);
        dialogRef.componentInstance.mensaje="Restaurante creado, ahora configura sus mesas";
        dialogRef.componentInstance.imagen="..//..//..//..//assets/Actualizar.svg";
    dialogRef.afterClosed().subscribe(result => {
    this.router.navigate(["/create-restaurant-2"]);})
        
      }else {
        const dialogRef = this.dialog.open(SimpleAlertComponent,{panelClass: ['animate__animated','animate__backInDown']});
        dialogRef.componentInstance.mensaje="Ese email ya existe en nuestra base de datos, tienes que elegir otro";
        dialogRef.componentInstance.imagen="..//..//..//..//assets/null.svg";
        const email:any=document.getElementById("mail")
        email.value=null;
        const password:any=document.getElementById("password")
        password.value=null;
        dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
    });}});
    this.restaurantmodel.street_number=restForm.value.street_number;
    this.restaurantmodel.street_name=restForm.value.street_name;
    this.restaurantmodel.city=restForm.value.city;
    this.url="https://nominatim.openstreetmap.org/search?q="+
      this.restaurantmodel.street_number+",+"+
      this.restaurantmodel.street_name.replace(" ","+")+",+"+
      this.restaurantmodel.city+"&format=json&addressdetails=1&limit=1&polygon_svg=1";
  }
  ngOnInit() {
  }
}