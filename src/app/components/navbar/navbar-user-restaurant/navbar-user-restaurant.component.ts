import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../../../shared/service-login.service';
import { ModalLogOutComponent } from '../../modals/modal-log-out/modal-log-out.component';
@Component({
  selector: 'app-navbarUserRestaurant',
  templateUrl: './navbar-user-restaurant.component.html',
  styleUrls: ['./navbar-user-restaurant.component.scss']
})
export class NavbarUserRestaurantComponent implements OnInit {

  public nav:number = 2;

  constructor(
    private router:Router,
    public serviceLogin:ServiceLoginService,
    public matDialog:MatDialog
    ) { }

  ngOnInit() {

  }
  public toLogIn() {
    const dialogRef = this.matDialog.open(ModalLogOutComponent);
      
      
    dialogRef.afterClosed().subscribe()
  {}

  }
  public toReservationListRestaurant() {
    this.router.navigate(["/reservations-list-restaurant"]);
    this.nav = 2;
  }
}
