import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { AirportsComponent } from './components/airports/airports.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { HomeComponent } from './components/home/home.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';

const routes: Routes = [
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicles/:id', component: VehicleComponent },
  { path: 'add-vehicle', component: AddVehicleComponent },
  { path: 'airports', component: AirportsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'drivers', component: DriversComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
