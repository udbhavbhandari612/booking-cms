import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService } from "src/app/services/backend.service";

@Component({
    selector: 'dialog-view-vehicle',
    templateUrl: 'delete-vehicle.html',
    styleUrls: ['delete-vehicle.scss']
})
export class DeleteVehicleDialog {
    vehicle: any;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private backend: BackendService, private dialog: MatDialogRef<DeleteVehicleDialog>) {
        this.vehicle = data;
    }

    deleteVehicle() {

        this.backend.deleteVehicle(this.vehicle.id).toPromise().then(res => {
            const vehicle = JSON.parse(JSON.stringify(res))
            this.dialog.close('reload')
            alert(vehicle.name + ' has been deleted successfully')

        }).catch(err => {
            console.log(err);
            
            alert(err.message)
        })
    }
}