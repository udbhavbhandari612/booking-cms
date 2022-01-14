import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingActionsDialog } from 'src/app/dialogs/booking-actions/booking-actions';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: any;
  constructor(private bookingsService: BookingsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBookings()
  }

  getBookings(filter?) {
    this.bookingsService.getBookings(filter?.value).toPromise().then(res => {
      if (res instanceof Array)
        res = res.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      this.bookings = res;

    })
  }

  actionsOnBooking(action, booking) {
    this.dialog.open(BookingActionsDialog, { data: { action, booking } }).afterClosed().subscribe(res => {
      if (res === 'reload')
        this.getBookings()
    })

  }

}
