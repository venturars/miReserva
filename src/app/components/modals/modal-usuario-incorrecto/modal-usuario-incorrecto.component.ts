import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-usuario-incorrecto',
  templateUrl: './modal-usuario-incorrecto.component.html',
  styleUrls: ['./modal-usuario-incorrecto.component.scss']
})
export class ModalUsuarioIncorrectoComponent implements OnInit {
  mensaje:string="null";
  constructor() { }

  ngOnInit(): void {
  }

}
