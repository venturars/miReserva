import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  public user:User;
  constructor() {
    this.user= new User(null,null,null,null,null,null);
   }
onSubmit(form){
  console.log(form.value);
}
  ngOnInit(): void {
  }

}
