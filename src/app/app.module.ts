import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewVehicleDialog } from './dialogs/view-vehicle/view-vehicle';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { DeleteVehicleDialog } from './dialogs/delete-vehicle/delete-vehicle';
import { AirportsComponent } from './components/airports/airports.component';
import { ViewAirportDialog } from './dialogs/view-airport/view-airport';
import { BookingActionsDialog } from './dialogs/booking-actions/booking-actions';
import { DriversComponent } from './components/drivers/drivers.component';
import { AddDriverDialog } from './dialogs/add-driver/add-driver';
import { RushHourDialogComponent } from './dialogs/rush-hour-dialog/rush-hour-dialog.component';
import { ViewDriverComponent } from './dialogs/view-driver/view-driver.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VehiclesComponent,
    BookingsComponent,
    NavbarComponent,
    VehicleComponent,
    AddVehicleComponent,
    AirportsComponent,
    DriversComponent,
    ViewVehicleDialog,
    DeleteVehicleDialog,
    ViewAirportDialog,
    BookingActionsDialog,
    AddDriverDialog,
    RushHourDialogComponent,
    ViewDriverComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
