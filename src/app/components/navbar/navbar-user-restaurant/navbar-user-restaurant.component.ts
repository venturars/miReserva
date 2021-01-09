import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../../../shared/service-login.service';
@Component({
  selector: 'app-navbarUserRestaurant',
  templateUrl: './navbar-user-restaurant.component.html',
  styleUrls: ['./navbar-user-restaurant.component.scss']
})
export class NavbarUserRestaurantComponent implements OnInit {

  @ViewChild('reservate') reservate: ElementRef;
  @ViewChild('out') out: ElementRef;

  constructor(
    private router:Router,
    public serviceLogin:ServiceLoginService
    ) { }

  ngOnInit() {

  }
  public toLogIn() {
    this.router.navigate(["/"]);
    this.out.nativeElement.style.cssText = `
    background: var(--primaryColorContrast);
    color: var(--secundaryColorOpposite)`;
    this.reservate.nativeElement.style.cssText = ``;
  }
  public toReservationListRestaurant() {
    this.router.navigate(["/reservations-list-restaurant"]);
    this.reservate.nativeElement.style.cssText = `
    background: var(--primaryColorContrast);
    color: var(--secundaryColorOpposite)`;
    this.out.nativeElement.style.cssText = ``;
  }
}
