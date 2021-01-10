import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarLogin',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.scss']
})
export class NavbarLoginComponent implements OnInit {

  @ViewChild('how') how: ElementRef;
  @ViewChild('contact') contact: ElementRef;
  @ViewChild('log') log: ElementRef;
  @ViewChild('signIn') signIn: ElementRef;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  public toContact() {
    this.router.navigate(["/contact-us"]);
    this.contact.nativeElement.style.cssText = `
    background: var(--primaryColorContrast);
    color: var(--secundaryColorOpposite)`;
    this.how.nativeElement.style.cssText = ``;
    this.log.nativeElement.style.cssText = ``;
    this.signIn.nativeElement.style.cssText = ``;
  }
  public toHowItWorks() {
    this.router.navigate(["/"]);
    this.contact.nativeElement.style.cssText = ``;
    this.how.nativeElement.style.cssText = `
    background: var(--primaryColorContrast);
    color: var(--secundaryColorOpposite)`;
    this.log.nativeElement.style.cssText = ``;
    this.signIn.nativeElement.style.cssText = ``;
  }
  public toRegister() {
    this.router.navigate(["/registration"]);
    this.contact.nativeElement.style.cssText = ``;
    this.signIn.nativeElement.style.cssText = `
    background: var(--primaryColorContrast);
    color: var(--secundaryColorOpposite)`;
    this.how.nativeElement.style.cssText = ``;
    this.log.nativeElement.style.cssText = ``;
  }
  public toLogIn() {
    this.router.navigate(["/log-in"]);
    this.contact.nativeElement.style.cssText = ``;
    this.log.nativeElement.style.cssText = `
    background: var(--primaryColorContrast);
    color: var(--secundaryColorOpposite)`;
    this.how.nativeElement.style.cssText = ``;
    this.signIn.nativeElement.style.cssText = ``;
  }
}
