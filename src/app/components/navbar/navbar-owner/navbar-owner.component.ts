import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../../../shared/service-login.service';

@Component({
  selector: 'app-navbarOwner',
  templateUrl: './navbar-owner.component.html',
  styleUrls: ['./navbar-owner.component.scss']
})
export class NavbarOwnerComponent implements OnInit {

  @ViewChild('add') add: ElementRef;
  @ViewChild('all') all: ElementRef;
  @ViewChild('out') out: ElementRef;
  @ViewChild('edit') edit: ElementRef;

  constructor(
    private router:Router,
    public serviceLogin:ServiceLoginService
  ) { }

  ngOnInit(): void {
  }
  public toCreateRestaurant1() {
    this.router.navigate(["/create-restaurant-1"]);
    this.add.nativeElement.style.cssText = `
      background: var(--primaryColorContrast);
      color: var(--secundaryColorOpposite)`;
    this.all.nativeElement.style.cssText = ``;
    this.out.nativeElement.style.cssText = ``;
    this.edit.nativeElement.style.cssText = ``;
  }
  public toRestaurantsList() {
    this.router.navigate(["/restaurants-list"]);
    this.add.nativeElement.style.cssText = ``;
  this.all.nativeElement.style.cssText = `
  background: var(--primaryColorContrast);
  color: var(--secundaryColorOpposite);`;
  this.out.nativeElement.style.cssText = ``;
  this.edit.nativeElement.style.cssText = ``;
  }
  public toLogIn() {
    this.router.navigate(["/"]);
    this.add.nativeElement.style.cssText = ``;
    this.all.nativeElement.style.cssText = ``;
    this.out.nativeElement.style.cssText = `
    background: var(--primaryColorContrast);
    color: var(--secundaryColorOpposite);`;
    this.edit.nativeElement.style.cssText = ``;
  }
  public toEditProfile() {
    this.router.navigate(["/edit-owner"]);
    this.add.nativeElement.style.cssText = ``;
    this.all.nativeElement.style.cssText = ``;
    this.out.nativeElement.style.cssText = ``;
    this.edit.nativeElement.style.cssText = `
    background: var(--primaryColorContrast);
    color: var(--secundaryColorOpposite);`;
  }
}