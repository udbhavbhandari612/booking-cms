import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AirportServiceService } from 'src/app/services/airport-service.service';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ViewAirportDialog } from 'src/app/dialogs/view-airport/view-airport';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.scss']
})
export class AirportsComponent implements OnInit {
  @ViewChild('airport') airportInput: ElementRef;

  airports: any;
  currentPlace: google.maps.places.PlaceResult;

  constructor(private airport: AirportServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllAirports();
  }

  ngAfterViewInit(): void {
    const airport = new google.maps.places.Autocomplete(this.airportInput.nativeElement, {
      componentRestrictions: { country: 'US' },
      fields: [
        "geometry",
        "name",
        "place_id",
        "types",
        "formatted_address",
        "address_components",
        "vicinity",
      ],
    })
    airport.addListener('place_changed', () => {
      this.currentPlace = airport.getPlace();
    })
  }

  getAllAirports() {
    this.airport.getAllAirports().toPromise()
      .then(res => {
        this.airports = res;
      })
      .catch(err => {
        alert(err.error)
      });
  }

  addAirport() {
    if (!this.currentPlace) {
      alert('Select a valid airport')
      return
    }

    const value = {
      ..._.omit(this.currentPlace, ['geometry', 'html_attributions', 'address_components']),
      geometry: {},
      address_components: this.currentPlace.address_components.map(v => _.omit(v, ['types']))
    }
    value.geometry = this.currentPlace.geometry.location.toJSON();

    this.airport.addAirport(value).toPromise()
      .then(res => {
        alert('Airport added successfully!')
        this.getAllAirports()
      })
      .catch(err => {
        alert(err.error)
      });


  }

  openAirport(airport) {
    this.dialog.open(ViewAirportDialog, { data: airport, panelClass: ['mw-100'] })
  }

  deleteAirport(id) {
    this.airport.deleteAirport(id).toPromise().then(res => {
      alert('Airport deleted successfully')
      this.getAllAirports()
    })
      .catch(err => {
        alert(err.error)
      })
  }

}
