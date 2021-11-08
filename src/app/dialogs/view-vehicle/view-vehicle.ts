import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService } from "src/app/services/backend.service";

@Component({
    selector: 'dialog-view-vehicle',
    templateUrl: 'view-vehicle.html',
    styleUrls: ['view-vehicle.scss']
})
export class ViewVehicleDialog {
    vehicle: any;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private backend: BackendService) {
        this.fetchVehicle(data.id)
    }

    fetchVehicle(id) {
        this.backend.getVehicle(id).toPromise().then(res => this.vehicle = res).catch(err => alert(err.message))
    }
}