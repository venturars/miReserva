import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-reserva-manual',
  templateUrl: './modal-reserva-manual.component.html',
  styleUrls: ['./modal-reserva-manual.component.scss']
})
export class ModalReservaManualComponent implements OnInit {
  public showHide= false;
  public showHide2= true;

  constructor() { }

  ngOnInit(): void {
  }

  public confirmar(){
    this.showHide = true
    this.showHide2 = false
  }

}
