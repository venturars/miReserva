import { Component, OnInit } from '@angular/core';
import { ServiceRouterService } from '../../../shared/service-router.service';

@Component({
  selector: 'verified-alert',
  templateUrl: './verified-alert.html',
  styleUrls: ['./verified-alert.scss']
})
export class VerifiedAlertComponent implements OnInit {

  constructor(
    private serviceRouter:ServiceRouterService
  ) { }
  ngOnInit(): void {
  }

  public aceptLogOut() {
    this.serviceRouter.routerLogin();
    setTimeout(function(){window.location.reload();},1000)
}}