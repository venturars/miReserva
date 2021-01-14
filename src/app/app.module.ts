import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
//-----Angular Material-----
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../material-module';
import {MatDialogModule} from '@angular/material/dialog';
//-----ngBootstrap-----
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//-----Forms-----
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//-----http-----
import { HttpClientModule } from '@angular/common/http';
//-----Components-----
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
import { FooterComponent } from './components/footer/footer.component';
import { ReservationsRestaurantComponent } from './components/restaurant/reservations/reservations.component';
import { EditComponentR } from './components/restaurant/owner/edit/edit.component';
import { DoReservationHeaderComponent } from './components/client/do-reservation-header/do-reservation-header.component';
import { ModalTurnosComponent } from './components/modals/modal-turnos/modal-turnos.component';
import { ModalClienteComponent } from './components/modals/modal-cliente/modal-cliente.component';
import { ModalRestauranteComponent } from './components/modals/modal-restaurante/modal-restaurante.component';
import { ModalReservaComponent } from './components/modals/modal-reserva/modal-reserva.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ModalReservaManualComponent } from './components/modals/modal-reserva-manual/modal-reserva-manual.component';
import { MapComponent } from './components/map/map.component';
import { DesignComponent } from './components/login/design/design.component';
import { ModalInfdeRestauranteComponent } from './components/modals/modal-infde-restaurante/modal-infde-restaurante.component';
import { ModalRegistroComponent } from './components/modals/modal-registro/modal-registro.component';
import { ModalRegistro2Component } from './components/modals/modal-registro2/modal-registro2.component';
import { ModalRegistroUsuarioComponent } from './components/modals/modal-registro-usuario/modal-registro-usuario.component';
import { ModalUsuarioIncorrectoComponent } from './components/modals/modal-usuario-incorrecto/modal-usuario-incorrecto.component';
import { ModalLogOutComponent } from './components/modals/modal-log-out/modal-log-out.component';
import { ContactUsComponent } from './components/login/contact-us/contact-us.component';
import { MaprestComponent } from './components/maprest/maprest.component';
import { PresentationComponent } from './components/login/presentation/presentation.component';



@NgModule({
  declarations: [
    AppComponent,
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
    FooterComponent,
    ReservationsRestaurantComponent,
    DoReservationHeaderComponent,
    ModalTurnosComponent,
    ModalClienteComponent,
    ModalRestauranteComponent,
    ModalReservaComponent,
    CalendarComponent,
    ModalReservaManualComponent,
    MapComponent,
    DesignComponent,
    ModalInfdeRestauranteComponent,
    ModalRegistroComponent,
    ModalRegistro2Component,
    ModalRegistroUsuarioComponent,
    ModalUsuarioIncorrectoComponent,
    ModalLogOutComponent,
    ContactUsComponent,
    MaprestComponent,
    PresentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }