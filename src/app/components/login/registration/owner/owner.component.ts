import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserOwner } from 'src/app/models/user-owner';
import { Users } from 'src/app/models/users';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { ServiceUserOwnerService } from 'src/app/shared/service-user-owner.service';

@Component({
  selector: 'app-registration-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  public user:User;

  constructor(private router: Router,private apiUserOwner:ServiceUserOwnerService, private apiLogin:ServiceLoginService ) {
    this.user= new User(null,null,null,null,null,null);
   }
onSubmit(form){
  console.log(form.value);
 

  const owner= {
    "owner_id": null,
    "cif": form.value.cif,
    "name": form.value.name,
    "surname": form.value.surname,
    "photo": null,
    "mail":form.value.email,
    "password":form.value.password
  } 
   console.log(owner);
  this.apiUserOwner.postOwner(owner)
  .subscribe((data)=>{
    if(data.control==true){
      this.router.navigate(['/restaurants-list']);
      this.apiLogin.userOwner= new UserOwner
      (data.data.owner_id,form.value.cif,form.value.name,form.value.surname,null);
      this.apiLogin.users= new Users (null,data.data.owner_id,null,form.value.email,form.value.password)
    }
    else{
  //   const dialogRef = this.dialog.open(ModalReservaManualComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //   console.log(`Dialog result: ${result}`);
  // });
    }
  })

  
} 
 ngOnInit(): void {
  
  }

}
