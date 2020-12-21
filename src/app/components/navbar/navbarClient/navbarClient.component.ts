import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbarClient',
  templateUrl: './navbarClient.component.html',
  styleUrls: ['./navbarClient.component.scss']
})
export class NavbarClientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public show() {
    const hide:any = document.getElementsByClassName("hide");
    for(let i=0; i<hide.length;i++) {
      if(hide[i].style.display === "none") {
        hide[i].style.display="flex"
      } else {
        hide[i].style.display="none"
  }}}
}
