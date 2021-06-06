import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'simple-alert',
  templateUrl: './simple-alert.html',
  styleUrls: ['./simple-alert.scss']
})
export class SimpleAlertComponent implements OnInit {
mensaje:string=null;
imagen:string=null;
  constructor() { }

  ngOnInit(): void {
 
  
  }

}
