import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-registration-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  public user:User;

  constructor( ) {
    this.user= new User(null,null,null,null,null,null);
   }
onSubmit(form){
  console.log(form.value);
} 
 ngOnInit(): void {
  
  }

}
