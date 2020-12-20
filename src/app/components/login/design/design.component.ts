import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
asd= "a"
  constructor(public router: Router) {
   }

  ngOnInit(): void {
  }
  eventoPadre(asd1:string){
    this.asd = asd1
    
    
  }
}
