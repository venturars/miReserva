import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { Restaurants } from 'src/app/models/restaurants';

@Component({
  selector: 'app-restaurant-owner-CreateRestaurant1',
  templateUrl: './create-restaurant1.component.html',
  styleUrls: ['./create-restaurant1.component.scss']
})
export class CreateRestaurant1Component implements OnInit {
  
  public restaurant:Restaurant;
  public restaurantmodel:Restaurants;

  constructor(public router:Router) {
    this.restaurant= new Restaurant (null,null,null,null,null,null,null,null,null,null);
    this.restaurantmodel= new Restaurants (null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
   }
  
   onSubmit(restForm){
     console.log(restForm.value);
     //hay que hacer el post del restaurante
     //hay que hacer un update del restaurant con el header una vez que se ha creado el restaurante
     //hay que hacer un update del restaurant calculando latitude y longitude
     this.router.navigate(["/create-restaurant-2"]);
   }

  ngOnInit(): void {
    // this.router.navigate(['navbar1'])
  }

}
