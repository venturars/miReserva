import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../../../shared/service-login.service';

@Component({
  selector: 'app-navbarOwner',
  templateUrl: './navbar-owner.component.html',
  styleUrls: ['./navbar-owner.component.scss']
})
export class NavbarOwnerComponent implements OnInit {

  constructor(
    private router:Router,
    public serviceLogin:ServiceLoginService
  ) { }

  ngOnInit(): void {
    console.log(this.serviceLogin.userOwner.photo);
    
  }
  public toCreateRestaurant1() {
    this.router.navigate(["/create-restaurant-1"]);
  }
  public toRestaurantsList() {
    this.router.navigate(["/restaurants-list"]);
  }
  public toLogIn() {
    this.router.navigate(["/"]);
  }
  public toEditProfile() {
    this.router.navigate(["/edit-owner"]);
  }
}
