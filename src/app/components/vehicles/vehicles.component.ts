import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { DeleteVehicleDialog } from 'src/app/dialogs/delete-vehicle/delete-vehicle';
import { ViewVehicleDialog } from 'src/app/dialogs/view-vehicle/view-vehicle';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicles: any = [];
  error: String;
  query: String;
  formGroup: FormGroup = new FormGroup({
    query: new FormControl('')
  })

  constructor(private backend: BackendService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute) {
    this.error = "";
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.q) {
      this.query = this.route.snapshot.queryParams.q
      this.searchVehicle(this.query);
      this.formGroup.patchValue({ query: this.query })
    } else {
      this.fetchAllVehicles()
    }
  }

  searchVehicle(query) {
    this.backend.searchVehicle(query).toPromise().then(res => this.vehicles = res).catch(err => this.error = err.message)
  }

  fetchAllVehicles() {
    this.backend.getAllVehicles().toPromise().then(res => this.vehicles = res).catch(err => this.error = err.message)
  }

  navigateTheSearch() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    if (this.formGroup.get('query').value)
      this.router.navigate(['/vehicles'], { queryParams: { q: this.formGroup.get('query').value } })
    else
      this.router.navigate(['/vehicles'])
  }

  viewVehicle(id) {
    this.dialog.open(ViewVehicleDialog, { data: { id }, panelClass: ['w-100'] })
  }

  handleInButtonClick(event, type, id) {
    event.stopPropagation()
    if (type === 'delete') {
      const ref = this.dialog.open(DeleteVehicleDialog, { data: { ..._.pick(this.vehicles.find(e => e.id === id), ['id', 'name']) } })
      ref.afterClosed().subscribe((res) => {
        if (res === 'reload')
          this.vehicles.splice(this.vehicles.findIndex(e => e.id === id))
      })
    }
    if (type === 'update')
      this.router.navigate(['vehicles/' + id])

  }

}
