import { Component, OnInit} from '@angular/core';
import { ServiceLoginService } from 'src/app/shared/service-login.service';

import { User } from 'src/app/models/user';



@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  public user:User;
  constructor(
    public serviceLogIn:ServiceLoginService
  ) {
    this.user= new User(null,null,null,null,null,null);
  }
  onSubmit(form:any){
  this.serviceLogIn.getUsers( 
    form.value.email,
    form.value.password
  );}
  ngOnInit(): void {
}}
