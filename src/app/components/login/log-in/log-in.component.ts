import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  public user:User;
  constructor(public router: Router) {
    this.user= new User(null,null,null,null,null,null);
   }
onSubmit(form:any){
  console.log(form.value);
  // routerLink al componente deseado desde el ts
  this.router.navigate(['/search'])
}
  ngOnInit(): void {
  }

}
