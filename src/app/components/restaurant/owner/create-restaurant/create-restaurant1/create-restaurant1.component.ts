import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-restaurant-owner-CreateRestaurant1',
  templateUrl: './create-restaurant1.component.html',
  styleUrls: ['./create-restaurant1.component.scss']
})
export class CreateRestaurant1Component implements OnInit {
  
  public restaurant:Restaurant;

  constructor(public router:Router) {
    this.restaurant= new Restaurant (null,null,null,null,null,null,null,null);
   }
  
   onSubmit(restForm){
     console.log(restForm.value);
     this.router.navigate(["/create-restaurant-2"]);
   }

  ngOnInit(): void {
    // this.router.navigate(['navbar1'])
  }

}
