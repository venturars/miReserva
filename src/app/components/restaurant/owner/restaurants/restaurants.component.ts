import { Component, OnInit } from '@angular/core';
import { Restaurants } from '../../../../models/restaurants';
import { ServiceLoginService } from '../../../../shared/service-login.service';
import { ServiceRestaurantService } from '../../../../shared/service-restaurant.service';
import { ServiceRouterService } from '../../../../shared/service-router.service';
import { Router } from '@angular/router';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';
import { SimpleAlertComponent } from '../../../modals/simple-alert/simple-alert';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-restaurant-owner-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  public restaurants:Restaurants[];
  public restaurantCopy:Restaurants[]=[];
  constructor(
    private serviceLogin:ServiceLoginService,
    private serviceRestaurant:ServiceRestaurantService,
    private serviceCalendar:ServiceCalendarService,
    public serviceRouter:ServiceRouterService,
    private router:Router,
    private dialog:MatDialog,
  ) { }

  ngOnInit() {
    this.serviceRestaurant.getRestaurantByOwner(
        this.serviceLogin.userOwner.owner_id
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
  public findRest(busqueda:any) {
    let same:RegExp = new RegExp(busqueda.value.toLowerCase());
    this.restaurantCopy=[];
    for (let i = 0; i < this.restaurants.length; i++) {
      if(same.test(this.restaurants[i].name.toLowerCase())){
        this.restaurantCopy.push(this.restaurants[i]);
        busqueda.value="";
    }}
    if(busqueda.value!==""){
      const dialogRef = this.dialog.open(SimpleAlertComponent);
      dialogRef.componentInstance.imagen="..//..//..//..//assets/null.svg";
      dialogRef.componentInstance.mensaje="No hemos encontrado ningún restaurante con ese nombre";
      dialogRef.afterClosed().subscribe();
  }}
}