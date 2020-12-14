import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
//-----Angular Material-----
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../material-module';
//-----ngBootstrap-----
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//-----Forms-----
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//-----http-----
import { HttpClientModule } from '@angular/common/http';
//-----Calendar-----
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
//-----Components-----
import { CalendarComponent } from './components/calendar/calendar.component';
import { NavbarClientComponent } from './components/navbar/navbarClient/navbarClient.component';
import { NavbarLoginComponent } from './components/navbar/navbar-login/navbar-login.component';
import { NavbarUserRestaurantComponent } from './components/navbar/navbar-user-restaurant/navbar-user-restaurant.component';
import { NavbarOwnerComponent } from './components/navbar/navbar-owner/navbar-owner.component';
import { LogInComponent } from './components/login/log-in/log-in.component';
import { RegistrationComponent } from './components/login/registration/registration.component';
import { ClientComponent } from './components/login/registration/client/client.component';
import { OwnerComponent } from './components/login/registration/owner/owner.component';
import { EditClientComponent } from './components/client/edit/edit.component';
import { ReservationsClientComponent } from './components/client/reservations/reservations.component';
import { SearchComponent } from './components/client/search/search.component';
import { DoReservation1Component } from './components/client/do-reservation1/do-reservation1.component';
import { DoReservation2Component } from './components/client/do-reservation2/do-reservation2.component';
import { RestaurantsComponent } from './components/restaurant/owner/restaurants/restaurants.component';
import { CreateRestaurant1Component } from './components/restaurant/owner/create-restaurant/create-restaurant1/create-restaurant1.component';
import { CreateRestaurant2Component } from './components/restaurant/owner/create-restaurant/create-restaurant2/create-restaurant2.component';
import { CreateRestaurant3Component } from './components/restaurant/owner/create-restaurant/create-restaurant3/create-restaurant3.component';
import { CreateRestaurantHeaderComponent } from './components/restaurant/owner/create-restaurant/create-restaurant-header/create-restaurant-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReservationsRestaurantComponent } from './components/restaurant/reservations/reservations.component';
import { EditComponentR } from './components/restaurant/owner/edit/edit.component';
import { DoReservationHeaderComponent } from './components/client/do-reservation-header/do-reservation-header.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NavbarClientComponent,
    NavbarLoginComponent,
    NavbarUserRestaurantComponent,
    NavbarOwnerComponent,
    LogInComponent,
    RegistrationComponent,
    ClientComponent,
    OwnerComponent,
    EditComponentR,
    EditClientComponent,
    ReservationsClientComponent,
    SearchComponent,
    DoReservation1Component,
    DoReservation2Component,
    RestaurantsComponent,
    CreateRestaurant1Component,
    CreateRestaurant2Component,
    CreateRestaurant3Component,
    CreateRestaurantHeaderComponent,
    FooterComponent,
    ReservationsRestaurantComponent,
    DoReservationHeaderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }