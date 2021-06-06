import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VerifiedAlertComponent } from '../components/modals/verified-alert/verified-alert';

@Injectable({
  providedIn: 'root'
})
export class ServiceRouterService {

  public navLogin:number = 0;
  public navCustomer: number = 0;
  public navOwner: number = 0;
  public navRestaurant:number = 0;

  constructor(
    private router:Router,
    private matDialog:MatDialog
  ) { }
  public routerLogin(value?:number) {
    switch (value) {
      case 1: this.router.navigate(["/contact-us"]); this.navLogin = 1; break;
      case 2: this.router.navigate(["/howItWorks"]); this.navLogin = 2; break;
      case 3: this.router.navigate(["/presentation"]); this.navLogin = 3; break;
      case 4: this.router.navigate(["/log-in"]); this.navLogin = 4; break;
      case 5: this.router.navigate(["/registration"]); this.navLogin = 5; break;
      default: this.router.navigate(["/"]); this.navLogin = 4;
  }}
  public routerClient(value?:number) {
    switch (value) {
      case 0: this.matDialog.open(VerifiedAlertComponent).afterClosed().subscribe(); break;
      case 1: this.router.navigate(["/reservations-list-client"]); this.navCustomer = 1; break;
      case 2: this.router.navigate(["/search"]); this.navCustomer = 2; break;
      case 3: this.router.navigate(["/edit-client"]); this.navCustomer = 3; break;
      default: this.router.navigate(["/search"]); this.navCustomer = 2;
  }}
  public routerOwner(value?:number) {
    switch (value) {
      case 0: this.matDialog.open(VerifiedAlertComponent).afterClosed().subscribe(); break;
      case 1: this.router.navigate(["/create-restaurant-1"]); this.navOwner = 1; break;
      case 2: this.router.navigate(["/restaurants-list"]); this.navOwner = 2; break;
      case 3: this.router.navigate(["/edit-owner"]); this.navOwner = 3; break;
      default: this.router.navigate(["/restaurants-list"]); this.navOwner = 2;
  }}
  public routerRestaurant(value?:number) {
    switch (value) {
      case 0: this.matDialog.open(VerifiedAlertComponent).afterClosed().subscribe(); break;
      case 1: this.router.navigate(["/reservations-list-restaurant"]); this.navRestaurant = 1; break;
      default: this.router.navigate(["/reservations-list-restaurant"]); this.navRestaurant = 1;
}}}