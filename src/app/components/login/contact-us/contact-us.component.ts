import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public persons:object[] = [
    {
      nombre: "Carolly",
      apellido1: "García",
      apellido2: "Morel",
      profesion: "UX/UI Design",
      photo: "./assets/fotoCarolly.jpg",
      linkedIn: "https://www.linkedin.com/in/carolly-garc%C3%ADa-36088b119/",
      linkedInPhoto: "assets/CarollyLink.svg"
    },
    {
      nombre: "Ventura",
      apellido1: "Rodríguez",
      apellido2: "Serrano",
      profesion: "UX/UI Developer",
      photo: "./assets/fotoVentu.jpg",
      linkedIn: "https://www.linkedin.com/in/ventura-rodr%C3%ADguez-255009199/",
      linkedInPhoto: "assets/VentuLink.svg"
    },
    {
      nombre: "Jesús",
      apellido1: "Cano",
      apellido2: "Padrino",
      profesion: "Full-Stack Developer",
      photo: "./assets/fotoJesus.jpg",
      linkedIn: "https://www.linkedin.com/in/jes%C3%BAs-cano-82718618/",
      linkedInPhoto: "assets/JesusLink.svg"
    },
    {
      nombre: "Juan",
      apellido1: "Gianina",
      apellido2: "",
      profesion: "Full-Stack Developer",
      photo: "./assets/fotoJuan.jpg",
      linkedIn: "https://www.linkedin.com/in/juan-gianina-3495811b8/",
      linkedInPhoto: "assets/JuanLink.svg"
    }
  ]
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }
}
