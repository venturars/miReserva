import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarClient',
  templateUrl: './navbarClient.component.html',
  styleUrls: ['./navbarClient.component.scss']
})
export class NavbarClientComponent implements OnInit {

  constructor(
    private router:Router
    ) { }

  ngOnInit(): void {
  }
  public toReservationListClient() {
    this.router.navigate(["/reservations-list-client"]);
  }
  public toSearch() {
    this.router.navigate(["/search"]);
  }
  public toLogIn() {
    this.router.navigate(["/"]);
  }
  public toEditProfile() {
    this.router.navigate(["/edit-client"]);
  }
}
