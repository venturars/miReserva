import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarLogin',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.scss']
})
export class NavbarLoginComponent implements OnInit {
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  public toContact() {
    this.router.navigate(["/"]);
  }
  public toHowItWorks() {
    this.router.navigate(["/"]);
  }
  public toRegister() {
    this.router.navigate(["/registration"]);
  }
  public toLogIn() {
    this.router.navigate(["/log-in"]);
  }
  public toHome() {
    this.router.navigate(["/"]);
  }
}
