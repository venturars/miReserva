import { Component, OnInit } from '@angular/core';
import { Users } from '../../../models/users';
import { UserCustomer } from '../../../models/user-customer';
import { ServiceLoginService } from '../../../shared/service-login.service';
import { ServiceUserCustomerService } from '../../../shared/service-user-customer.service';
@Component({
  selector: 'app-client-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditClientComponent implements OnInit {
  public userCustomer:UserCustomer;
  public users:Users;
  public pass:string;
  public checkPassword:string;
  public checkPassword2:string;
  public message:string;
  constructor (
    private serviceLogin:ServiceLoginService,
    private serviceUserCustomer:ServiceUserCustomerService
    ) { }
   processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
    this.userCustomer.photo = "assets/photos/" + file.name;
    const imagen = document.getElementById("photo").setAttribute("src", this.userCustomer.photo);
    });
    reader.readAsDataURL(file);
  }
  onSubmit() {
    if (this.pass !== this.users.password) {
      this.message = 'Contraseña incorrecta';
      this.pass = null;
    } else {
      if (this.checkPassword !== this.checkPassword2) {
        this.message = 'Las contraseñas no coinciden';
        this.pass = null;
        this.checkPassword = null;
        this.checkPassword2 = null;
      }else {
        let password:string = this.pass;
        if(this.checkPassword) {
          password = this.checkPassword;
        }
        this.serviceUserCustomer.putCustomer({
          "customer_id": this.users.customer_id,
          "password": password,
          "phone": this.userCustomer.phone,
          "name": this.userCustomer.name,
          "surname": this.userCustomer.surname,
          "photo": this.userCustomer.photo
        }).subscribe((response:any) => {
          if(!response.control) {
            //Modal los cambios no se han podido guardar
          }else {
            //Modal de los cambios se han guardado correctamente
            this.users.password = password;
            this.serviceLogin.users.password = this.users.password;
            this.serviceLogin.userCustomer = this.userCustomer;
          }
          this.message = null;
          this.pass = null;
          this.checkPassword = null;
          this.checkPassword2 = null;
  });}}}

  ngOnInit() {
    this.userCustomer = this.serviceLogin.userCustomer;
    this.users = this.serviceLogin.users;
  }
}