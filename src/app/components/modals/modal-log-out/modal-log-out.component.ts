import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from 'src/app/shared/service-login.service';

@Component({
  selector: 'app-modal-log-out',
  templateUrl: './modal-log-out.component.html',
  styleUrls: ['./modal-log-out.component.scss']
})
export class ModalLogOutComponent implements OnInit {

  constructor(private router:Router,
              private serviceLogin:ServiceLoginService) { }

  ngOnInit(): void {
  }

  public aceptLogOut(){
    this.router.navigate(["/log-in"]);
    this.serviceLogin.navCustomer = 3; 
    setTimeout(function(){window.location.reload();},1000)
    

  }

}
