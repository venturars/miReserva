import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../../../shared/service-login.service';
@Component({
  selector: 'app-navbarClient',
  templateUrl: './navbarClient.component.html',
  styleUrls: ['./navbarClient.component.scss']
})
export class NavbarClientComponent implements OnInit {

  @ViewChild('my') my: ElementRef;
  @ViewChild('reservate') reservate: ElementRef;
  @ViewChild('out') out: ElementRef;
  @ViewChild('edit') edit: ElementRef;

  constructor(
    private router:Router,
    public serviceLogin:ServiceLoginService
    ) { }

  ngOnInit(): void {
  }
  public toReservationListClient() {
    this.router.navigate(["/reservations-list-client"]);
    this.my.nativeElement.style.cssText = `
    background: var(--primaryColorContrast);
    color: var(--secundaryColorOpposite)`;
    this.out.nativeElement.style.cssText = ``;
    this.edit.nativeElement.style.cssText = ``;
    this.reservate.nativeElement.style.cssText = ``;
  }
  public toSearch() {
    this.router.navigate(["/search"]);
    this.reservate.nativeElement.style.cssText = `
    background: var(--primaryColorContrast);
    color: var(--secundaryColorOpposite)`;
    this.out.nativeElement.style.cssText = ``;
    this.edit.nativeElement.style.cssText = ``;
    this.my.nativeElement.style.cssText = ``;
  }
  public toLogIn() {
    this.router.navigate(["/"]);
    this.out.nativeElement.style.cssText = `
    background: var(--primaryColorContrast);
    color: var(--secundaryColorOpposite)`;
    this.reservate.nativeElement.style.cssText = ``;
    this.edit.nativeElement.style.cssText = ``;
    this.my.nativeElement.style.cssText = ``;
  }
  public toEditProfile() {
    this.router.navigate(["/edit-client"]);
    this.edit.nativeElement.style.cssText = `
    background: var(--primaryColorContrast);
    color: var(--secundaryColorOpposite)`;
    this.out.nativeElement.style.cssText = ``;
    this.reservate.nativeElement.style.cssText = ``;
    this.my.nativeElement.style.cssText = ``;
}}