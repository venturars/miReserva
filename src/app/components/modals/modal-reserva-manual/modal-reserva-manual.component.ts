import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';
import { ServiceReservationsService } from 'src/app/shared/service-reservations.service';
import { ServiceShiftsService } from 'src/app/shared/service-shifts.service';
import { ServiceTablesService } from 'src/app/shared/service-tables.service';
import { ServiceTimesService } from 'src/app/shared/service-times.service';
import { CalendarComponent } from '../../calendar/calendar.component';

@Component({
  selector: 'app-modal-reserva-manual',
  templateUrl: './modal-reserva-manual.component.html',
  styleUrls: ['./modal-reserva-manual.component.scss']
})
export class ModalReservaManualComponent implements OnInit {
  public showHide= false;
  public showHide2= true;
  public selectedDayName:string
  public selectedDayNum:string
  public selectedMonth:string
  public selectedYear:string

  constructor(public dialog: MatDialog,
              private reservationService: ServiceReservationsService,
              private timesService: ServiceTimesService,
              private shiftsService: ServiceShiftsService,
              private calendarService: ServiceCalendarService,
              private tablesService: ServiceTablesService,
              // private reservationService: ServiceReservationsService,
              ) {

   }

  ngOnInit(): void {
  }

  public confirmar(){
    this.showHide = true
    this.showHide2 = false
  }

  public calendar(){
    const dialogRef = this.dialog.open(CalendarComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.calendarService.nuevaFecha);  
      this.selectedDayName = this.calendarService.nuevaFecha.dayName
      this.selectedDayNum = this.calendarService.nuevaFecha.dayNum
      this.selectedMonth = this.calendarService.nuevaFecha.month
      this.selectedYear = this.calendarService.nuevaFecha.year
  
    });
  }


}
