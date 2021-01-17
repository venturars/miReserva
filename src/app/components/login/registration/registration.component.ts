import { Component, OnInit } from '@angular/core';
import { ServiceRouterService } from '../../../shared/service-router.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor(
    public serviceRouter:ServiceRouterService
  ) { }

  ngOnInit(): void {
  }
}
