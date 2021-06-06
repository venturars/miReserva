import { Component, OnInit } from '@angular/core';
import { ServiceRouterService } from '../../../shared/service-router.service';

@Component({
  selector: 'app-navbarLogin',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.scss']
})
export class NavbarLoginComponent implements OnInit {

  constructor(
    public serviceRouter:ServiceRouterService
  ) { }

  ngOnInit(): void {
  }}
