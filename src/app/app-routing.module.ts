import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoReservation1Component } from './components/client/do-reservation1/do-reservation1.component';
import { DoReservation2Component } from './components/client/do-reservation2/do-reservation2.component';
import { EditClientComponent } from './components/client/edit/edit.component';
import { ReservationsClientComponent } from './components/client/reservations/reservations.component';
import { SearchComponent } from './components/client/search/search.component';
import { LogInComponent } from './components/login/log-in/log-in.component';
import { ClientComponent } from './components/login/registration/client/client.component';
import { OwnerComponent } from './components/login/registration/owner/owner.component';
import { RegistrationComponent } from './components/login/registration/registration.component';
import { CreateRestaurantHeaderComponent } from './components/restaurant/owner/create-restaurant/create-restaurant-header/create-restaurant-header.component';
import { CreateRestaurant1Component } from './components/restaurant/owner/create-restaurant/create-restaurant1/create-restaurant1.component';
import { CreateRestaurant2Component } from './components/restaurant/owner/create-restaurant/create-restaurant2/create-restaurant2.component';
import { CreateRestaurant3Component } from './components/restaurant/owner/create-restaurant/create-restaurant3/create-restaurant3.component';
import { EditComponentR } from './components/restaurant/owner/edit/edit.component';
import { RestaurantsComponent } from './components/restaurant/owner/restaurants/restaurants.component';
import { ReservationsRestaurantComponent } from './components/restaurant/reservations/reservations.component';

const routes: Routes = [
  {path:"reservation1", component: DoReservation1Component},
  {path:"reservation2", component:DoReservation2Component},
  {path:"reservations-list-client", component:ReservationsClientComponent},
  {path:"edit-client", component:EditClientComponent},
  {path:"reservations-list-restaurant", component:ReservationsRestaurantComponent},
  {path:"search", component: SearchComponent},
  {path:"log-in", component: LogInComponent},
  {path:"registration", component: RegistrationComponent},
  {path:"registration-owner", component: OwnerComponent},
  {path:"registration-client", component: ClientComponent},
  {path:"edit-owner", component: EditComponentR},
  {path:"create-restaurant-1", component: CreateRestaurant1Component},
  {path:"create-restaurant-2", component: CreateRestaurant2Component},
  {path:"create-restaurant-3", component: CreateRestaurant3Component},
  {path:"create-restaurant-header", component: CreateRestaurantHeaderComponent},
  {path:"restaurants-list", component: RestaurantsComponent},
  {path:"**", component:LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
