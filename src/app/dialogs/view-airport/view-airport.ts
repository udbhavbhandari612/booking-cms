import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirportServiceService } from "src/app/services/airport-service.service";

@Component({
    selector: 'dialog-view-airport',
    templateUrl: 'view-airport.html',
    styleUrls: ['view-airport.scss']
})
export class ViewAirportDialog {
    airport: any;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private airportService: AirportServiceService, private dialog: MatDialogRef<ViewAirportDialog>) {
        this.airport = data;
    }

    updateAirport() {
        this.airportService.updateAirport(this.airport.place_id, this.airport.toll_price).toPromise()
            .then(res => {
                alert('Airport updated successfully!')
                this.dialog.close()
            })
            .catch(err => alert(err.error))

    }

}