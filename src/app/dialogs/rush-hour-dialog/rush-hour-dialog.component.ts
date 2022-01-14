import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-rush-hour-dialog',
  templateUrl: './rush-hour-dialog.component.html',
  styleUrls: ['./rush-hour-dialog.component.scss']
})
export class RushHourDialogComponent implements OnInit {
  times: any[] = []
  rushHour: any;
  fare: any;

  constructor(private backend: BackendService, private dialog: MatDialogRef<RushHourDialogComponent>) { }

  ngOnInit(): void {
    for (let i = 1; i <= 24; i++) {
      if (i === 12 || i === 24) {
        this.times.push(`${formatNumber(12, 'en-us', '2.0-0')}:00 AM`)
        continue
      }
      if (i <= 12)
        this.times.push(`${formatNumber(i % 12, 'en-us', '2.0-0')}:00 AM`)
      else
        this.times.push(`${formatNumber(i % 12, 'en-us', '2.0-0')}:00 PM`)
    }
    this.backend.getRushHours().toPromise().then(res => this.rushHour = res || { start_time: '', end_time: '', fare: 0 }).catch(err => console.log(err))
  }

  setTime(type, time) {
    this.rushHour[type] = time.value
  }

  save() {
    if (this.fare)
      this.rushHour.fare = this.fare
    this.backend.setRushHours(this.rushHour).toPromise()
      .then(res => {
        alert('Successfully set!')
        this.dialog.close()
      })
      .catch(err => {
        alert(err.error.message || err.message)
        console.log(err);

      })
  }

}
