import { Component, OnInit } from '@angular/core';
import { ServiceRouterService } from '../../../shared/service-router.service';
import { ServiceLoginService } from '../../../shared/service-login.service';
@Component({
  selector: 'app-navbarUserRestaurant',
  templateUrl: './navbar-user-restaurant.component.html',
  styleUrls: ['./navbar-user-restaurant.component.scss']
})
export class NavbarUserRestaurantComponent implements OnInit {

  constructor(
    public serviceRouter:ServiceRouterService,
    public serviceLogin:ServiceLoginService
    ) { }

  ngOnInit() {
}}