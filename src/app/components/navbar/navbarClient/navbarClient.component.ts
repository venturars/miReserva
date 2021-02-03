import { Component, OnInit } from '@angular/core';
import { ServiceRouterService } from '../../../shared/service-router.service';

@Component({
  selector: 'app-navbarClient',
  templateUrl: './navbarClient.component.html',
  styleUrls: ['./navbarClient.component.scss']
})
export class NavbarClientComponent implements OnInit {

  public userCustomer:any = JSON.parse(localStorage.getItem('userCustomer'));

  constructor(
    public serviceRouter:ServiceRouterService
    ) { }

  ngOnInit() {
}}