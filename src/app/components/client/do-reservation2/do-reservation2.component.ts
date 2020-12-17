import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalReservaComponent } from '../../modals/modal-reserva/modal-reserva.component';

@Component({
  selector: 'app-client-doReservation2',
  templateUrl: './do-reservation2.component.html',
  styleUrls: ['./do-reservation2.component.scss']
})
export class DoReservation2Component implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalReservaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
