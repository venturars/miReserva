import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-registration-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public user:User;

  constructor(public router:Router ) {
    this.user= new User(null,null,null,null,null,null);
   }
onSubmit(form){
  console.log(form.value);
  this.router.navigate(["/search"]);
} 
  ngOnInit(): void {
  }

}
