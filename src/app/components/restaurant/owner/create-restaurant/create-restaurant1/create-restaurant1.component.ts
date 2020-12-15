import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-restaurant-owner-CreateRestaurant1',
  templateUrl: './create-restaurant1.component.html',
  styleUrls: ['./create-restaurant1.component.scss']
})
export class CreateRestaurant1Component implements OnInit {
  
  public restaurant:Restaurant;

  constructor() {
    this.restaurant= new Restaurant (null,null,null,null,null,null,null,null);
   }
  
   onSubmit(restForm){
     console.log(restForm.value)
   }

  ngOnInit(): void {
  }

}
