import { Component, OnInit } from '@angular/core';
import { Reservations } from 'src/app/models/reservations';
import { ServiceReservationsService } from 'src/app/shared/service-reservations.service';

@Component({
  selector: 'modal-rejectReservationClient',
  templateUrl: './modal-rejectReservationClient.html',
  styleUrls: ['./modal-rejectReservationClient.scss']
})
export class RejectReservationClientComponent implements OnInit {
  public showHide= false;
  public showHide2= true;
  public reservation:Reservations
  constructor(private reservationService: ServiceReservationsService,
    ) { }

  ngOnInit(): void {
  }

  public confirmar(){
    this.reservation = this.reservationService.reservation
    this.reservation.status = "Cancelada por cliente"
    this.reservationService.putReservation(this.reservation).subscribe((data4:any) =>{    
    })
    this.showHide = true
    this.showHide2 = false
  }

  public accept(){
    this.showHide = false
    this.showHide2 = true
  }
}
