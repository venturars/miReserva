import { Component, OnInit } from '@angular/core';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';

@Component({
  selector: 'app-client-doReservationHeader',
  templateUrl: './do-reservation-header.component.html',
  styleUrls: ['./do-reservation-header.component.scss']
})
export class DoReservationHeaderComponent implements OnInit {

  constructor(public restaurantService: ServiceRestaurantService) {
    
   }

  ngOnInit(): void {
  }

}
