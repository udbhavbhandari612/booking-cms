import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RushHourDialogComponent } from 'src/app/dialogs/rush-hour-dialog/rush-hour-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  setRushHoursAndFare() {
    this.dialog.open(RushHourDialogComponent)

  }

}
