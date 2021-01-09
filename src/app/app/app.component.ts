import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from '../shared/service-login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'miReserva';
  constructor (
    public router:Router,
    public serviceLogin:ServiceLoginService
    ){ }
  ngOnInit() { 
    if (this.router.url == " "){
      this.router.navigate[('log-in')]
    }}

  }

