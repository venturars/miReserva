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
    this.restaurant= new Restaurant (null,null,null,null,null,null,null,null,null,"Elige tipo de comida");
   }
   processBanner(imageInput:any) {
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

  
   onSubmit(restForm){
     console.log(restForm.value);
     this.router.navigate(["/create-restaurant-2"]);
   }

  ngOnInit(): void {
    // this.router.navigate(['navbar1'])
  }

}
