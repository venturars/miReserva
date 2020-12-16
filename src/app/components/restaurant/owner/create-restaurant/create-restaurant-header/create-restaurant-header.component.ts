import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-restaurant-owner-CreateRestaurantHeader',
  templateUrl: './create-restaurant-header.component.html',
  styleUrls: ['./create-restaurant-header.component.scss']
})
export class CreateRestaurantHeaderComponent implements OnInit {
public restaurant: Restaurant;
  constructor() {
    this.restaurant= new Restaurant (null,null,null,null,null,null,null,null);
   }

  processBanner(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
    //const imagen=document.getElementById("mostrarbanner").setAttribute("src", event.target.result);
    this.restaurant.logo="assets/photos/" +file.name;
    const imagen=document.getElementById("mostrarbanner").setAttribute("src", this.restaurant.logo);
    
  })
  reader.readAsDataURL(file);
}

processLogo(imageInput: any) {
  const file: File = imageInput.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', (event: any) => {
 // const imagen=document.getElementById("mostrarlogo").setAttribute("src", event.target.result);
  this.restaurant.logo="assets/photos/" +file.name;
  const imagen=document.getElementById("mostrarlogo").setAttribute("src", this.restaurant.logo);
 
})
reader.readAsDataURL(file);
}
  ngOnInit(): void {
  }

}
