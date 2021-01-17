import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../../../shared/service-login.service';
import { VerifiedAlertComponent } from '../../modals/verified-alert/verified-alert';

@Component({
  selector: 'app-navbarOwner',
  templateUrl: './navbar-owner.component.html',
  styleUrls: ['./navbar-owner.component.scss']
})
export class NavbarOwnerComponent implements OnInit {

  constructor(
    private router:Router,
    public serviceLogin:ServiceLoginService,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
  }
  public toCreateRestaurant1() {
    this.router.navigate(["/create-restaurant-1"]);
    this.serviceLogin.navOwner = 1;
  }
  public toRestaurantsList() {
    this.router.navigate(["/restaurants-list"]);
    this.serviceLogin.navOwner = 2;
  }
  public toLogIn() {
    const dialogRef = this.matDialog.open(VerifiedAlertComponent);
      
      
      dialogRef.afterClosed().subscribe()
    {}
  
  }
  public toEditProfile() {
    this.router.navigate(["/edit-owner"]);
    this.serviceLogin.navOwner = 4;
}}