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
  morningRushHour: any;
  nightRushHour: any;
  morning_fare: any;
  night_fare: any;

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
    this.backend.getRushHours().toPromise().then((res: any) => {
      this.morningRushHour = res.find(v => v.type === 'morning') || {
        morning_start_time: '', morning_end_time: '', morning_fare: 0
      }
      this.nightRushHour = res.find(v => v.type === 'night') || {
        night_start_time: '', night_end_time: '', night_fare: 0
      }
    }).catch(err => console.log(err))
  }

  setMorningTime(type, time) {
    this.morningRushHour[type] = time.value
  }

  setNightTime(type, time) {
    this.nightRushHour[type] = time.value
  }

  save() {
    if (this.morning_fare)
      this.morningRushHour.morning_fare = this.morning_fare
    if (this.night_fare)
      this.nightRushHour.night_fare = this.night_fare
    this.backend.setRushHours({ ...this.morningRushHour, ...this.nightRushHour }).toPromise()
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
