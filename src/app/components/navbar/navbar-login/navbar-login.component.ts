import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarLogin',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.scss']
})
export class NavbarLoginComponent implements OnInit {

  public nav:number = 4;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  public toContact() {
    this.router.navigate(["/contact-us"]);
    this.nav = 1;
  }
  public toHowItWorks() {
    this.router.navigate(["/"]);
    this.nav = 2;
  }
  public toRegister() {
    this.router.navigate(["/registration"]);
    this.nav = 3;
  }
  public toLogIn() {
    this.router.navigate(["/log-in"]);
    this.nav = 4;
  }
  public toPresentation() {
    this.router.navigate(["/presentation"]);
    this.nav = 5;
  }
}
