import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-owner-CreateRestaurantHeader',
  templateUrl: './create-restaurant-header.component.html',
  styleUrls: ['./create-restaurant-header.component.scss']
})
export class CreateRestaurantHeaderComponent implements OnInit {

  constructor() { }

  processBanner(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
    const imagen=document.getElementById("mostrarbanner").setAttribute("src", event.target.result);
    
  })
  reader.readAsDataURL(file);
}

processLogo(imageInput: any) {
  const file: File = imageInput.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', (event: any) => {
  const imagen=document.getElementById("mostrarlogo").setAttribute("src", event.target.result);
  
})
reader.readAsDataURL(file);
}
  ngOnInit(): void {
  }

}
