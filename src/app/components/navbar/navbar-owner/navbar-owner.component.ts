import { Component, OnInit } from '@angular/core';
import { ServiceRouterService } from '../../../shared/service-router.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarOwner',
  templateUrl: './navbar-owner.component.html',
  styleUrls: ['./navbar-owner.component.scss']
})
export class NavbarOwnerComponent implements OnInit {
  
  public userOwner:any = JSON.parse(localStorage.getItem('userOwner'));
  
  constructor(
    public serviceRouter:ServiceRouterService,
    public router:Router
  ) { }
  ngOnInit(): void {
}}