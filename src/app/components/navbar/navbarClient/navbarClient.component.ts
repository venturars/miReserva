import { Component, OnInit } from '@angular/core';
import { ServiceLoginService } from '../../../shared/service-login.service';
import { ServiceRouterService } from '../../../shared/service-router.service';

@Component({
  selector: 'app-navbarClient',
  templateUrl: './navbarClient.component.html',
  styleUrls: ['./navbarClient.component.scss']
})
export class NavbarClientComponent implements OnInit {

  constructor(
    public serviceRouter:ServiceRouterService,
    public serviceLogin:ServiceLoginService
    ) { }

  ngOnInit() {
}}