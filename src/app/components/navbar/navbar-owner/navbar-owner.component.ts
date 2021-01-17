import { Component, OnInit } from '@angular/core';
import { ServiceRouterService } from '../../../shared/service-router.service';
import { ServiceLoginService } from '../../../shared/service-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarOwner',
  templateUrl: './navbar-owner.component.html',
  styleUrls: ['./navbar-owner.component.scss']
})
export class NavbarOwnerComponent implements OnInit {

  constructor(
    public serviceRouter:ServiceRouterService,
    public serviceLogin:ServiceLoginService,
    public router:Router
  ) { }
  ngOnInit(): void {
}}