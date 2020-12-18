import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.scss']
})
export class ModalClienteComponent implements OnInit {
  public showHide= false;
  public showHide2= true;

  constructor() { }

  ngOnInit(): void {
  }

  public confirmar(){
    this.showHide = true
    this.showHide2 = false
  }

  public accept(){
    this.showHide = false
    this.showHide2 = true
  }
}
