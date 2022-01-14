import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingsService } from "src/app/services/bookings.service";
import { DriverService } from "src/app/services/driver.service";

@Component({
    selector: 'dialog-booking-actions',
    templateUrl: 'booking-actions.html',
    styleUrls: ['booking-actions.scss']
})
export class BookingActionsDialog {
    booking: any;
    inProgress: boolean = false;
    drivers: any;
    driver: FormControl = new FormControl('', [Validators.required])
    reason: FormControl = new FormControl('')
    action: String;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private bookingService: BookingsService,
        private dialog: MatDialogRef<BookingActionsDialog>,
        private driverService: DriverService
    ) {
        this.booking = data.booking;
        this.action = data.action;
        if (data.action === 'approve')
            this.getDrivers()
    }

    getDrivers() {
        this.driverService.getDrivers().toPromise().then(res => this.drivers = res)
    }

    takeAction() {
        if (this.action === 'approve' && !this.driver.value)
            return
        this.inProgress = true;
        this.dialog.disableClose = false
        if (this.action === 'approve')
            this.bookingService.approveBooking(this.booking.booking_id, this.driver.value).toPromise().then(res => {
                alert('Booking approved successfully')
            }).catch(err => {
                console.log(err);
                alert(err.error)
            }).finally(() => {
                this.inProgress = false;
                this.dialog.close('reload');
            })
        else
            this.bookingService.rejectBooking(this.booking.booking_id, this.reason.value).toPromise().then(res => {
                alert('Booking rejected successfully')
            }).catch(err => {
                console.log(err);
                alert(err.error)
            }).finally(() => {
                this.inProgress = false;
                this.dialog.close('reload');
            })
    }



}