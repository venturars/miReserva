import { Component, OnInit } from '@angular/core';
import { Restaurants } from '../../../../models/restaurants';
import { ServiceRestaurantService } from '../../../../shared/service-restaurant.service';
import { ServiceRouterService } from '../../../../shared/service-router.service';
import { Router } from '@angular/router';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';

@Component({
  selector: 'app-restaurant-owner-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  public restaurants:Restaurants[];
  public restaurantCopy:Restaurants[]=[];
  constructor(
    private serviceRestaurant:ServiceRestaurantService,
    private serviceCalendar:ServiceCalendarService,
    public serviceRouter:ServiceRouterService,
    private router:Router
  ) { }

  ngOnInit() {
    this.serviceRestaurant.getRestaurantByOwner(
        JSON.parse(localStorage.getItem('userOwner')).owner_id
      ).subscribe((response) => {
        if(response.control) {
          this.restaurants = response.data;
    }});}
  public clickRestaurant(index:number) {
    this.serviceRestaurant.selectedRestaurant = this.restaurants[index];
    this.serviceCalendar.restaurantId = this.restaurants[index].restaurant_id;
    
    this.serviceCalendar.getTimes(this.restaurants[index].restaurant_id)
    this.router.navigate(['/reservations-list-restaurant']);
}
public findRest(busqueda){
  this.restaurantCopy=[];
  
  let control=false;
  for (let i=0;i<this.restaurants.length;i++){
    if(this.restaurants[i].name.toLowerCase()==busqueda.value.toLowerCase()){
      this.restaurantCopy.push(this.restaurants[i]);
      busqueda.value="";
      control=true;
    }
  
  } 
  if(!control){
    busqueda.style.color="var(--primaryColor)";
    busqueda.value="Restaurante no encontrado"
    setTimeout(function(){busqueda.value="";
                          busqueda.style.color="var(--secundaryColorOpposite)"}
                          ,2500);
  }
}

public showAll(){
  this.restaurantCopy=[];
}

}