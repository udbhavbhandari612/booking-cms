import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDriverDialog } from 'src/app/dialogs/add-driver/add-driver';
import { ViewDriverComponent } from 'src/app/dialogs/view-driver/view-driver.component';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  drivers: any;
  constructor(private dialog: MatDialog, private driverService: DriverService) { }

  ngOnInit(): void {
    this.getDrivers()
  }

  getDrivers() {
    this.driverService.getDrivers().toPromise().then(res => {
      if (res instanceof Array)
        res = res.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      this.drivers = res
    })
      .catch(err => {
        console.log(err);
        alert(err.message)
      })
  }

  addDriver() {
    this.dialog.open(AddDriverDialog).afterClosed().subscribe(res => {
      if (res === 'reload')
        this.getDrivers()
    })
  }

  viewDriver(driver, e) {
    e.stopPropagation();
    this.dialog.open(ViewDriverComponent, { data: { driver } })
  }

  deleteDriver(driver, e) {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete " + driver.name + "?")) {
      this.driverService.deleteDriver(driver._id).toPromise().then(res => {
        alert('Driver deleted successfully')
        this.getDrivers()
      })
        .catch(err => {
          console.log(err);
          alert(err.message)
        })
    }

  }

}
