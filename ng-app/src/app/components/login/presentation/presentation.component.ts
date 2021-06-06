import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  public pages:string[] = [
    "assets/presentacion/slide-01.svg",
    "assets/presentacion/slide-02.svg",
    "assets/presentacion/slide-03.svg",
    "assets/presentacion/slide-04.jpg",
    "assets/presentacion/slide-05.svg",
    "assets/presentacion/slide-06.jpg",
    "assets/presentacion/slide-07.jpg",
    "assets/presentacion/slide-08.svg",
    "assets/presentacion/slide-09.jpg",
    "assets/presentacion/slide-10.svg",
    "assets/presentacion/slide-11.svg",
    "assets/presentacion/slide-12.svg",
    "assets/presentacion/slide-13.svg",
    "assets/presentacion/slide-14.svg",
    "assets/presentacion/slide-15.svg",
    "assets/presentacion/slide-16.jpg",
    "assets/presentacion/slide-17.svg",
    "assets/presentacion/slide-18.svg",
    "assets/presentacion/slide-19.svg"
  ];

  constructor() { }

  ngOnInit(): void {
}}