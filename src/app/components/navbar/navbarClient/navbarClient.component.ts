import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../../../shared/service-login.service';
import { ModalLogOutComponent } from '../../modals/modal-log-out/modal-log-out.component';
@Component({
  selector: 'app-navbarClient',
  templateUrl: './navbarClient.component.html',
  styleUrls: ['./navbarClient.component.scss']
})
export class NavbarClientComponent implements OnInit {

  constructor(
    private router:Router,
    public serviceLogin:ServiceLoginService,
    private matDialog:MatDialog
    ) { }

  ngOnInit() {
  }
  public toReservationListClient() {
    this.router.navigate(["/reservations-list-client"]);
    this.serviceLogin.navCustomer = 4;
  }
  public toSearch() {
    this.router.navigate(["/search"]);
    this.serviceLogin.navCustomer = 3;
  }
  public toLogIn() {
    const dialogRef = this.matDialog.open(ModalLogOutComponent);
      
      
      dialogRef.afterClosed().subscribe()
    {}
  }
  public toEditProfile() {
    this.router.navigate(["/edit-client"]);
    this.serviceLogin.navCustomer = 1;
}}