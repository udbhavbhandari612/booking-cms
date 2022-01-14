import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  vehicle: any;
  error: any;
  addedPhotos: any[] = [];
  submitting: boolean = false;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    passenger_capacity: new FormControl('', [Validators.required]),
    child_seat_capacity: new FormControl('', [Validators.required]),
    luggage_capacity: new FormControl('', [Validators.required]),
    baseprice: new FormControl(0, [Validators.required, Validators.min(0)]),
    price0to5: new FormControl(0, [Validators.required, Validators.min(0)]),
    price5to10: new FormControl(0, [Validators.required, Validators.min(0)]),
    price10to15: new FormControl(0, [Validators.required, Validators.min(0)]),
    price15plus: new FormControl(0, [Validators.required, Validators.min(0)]),
    photos: new FormControl([])
  })

  constructor(private route: ActivatedRoute, private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.fetchVehicle(this.route.snapshot.params.id)
  }

  fetchVehicle(id) {
    this.backend.getVehicle(id).toPromise().then(res => {
      this.vehicle = res;
      this.formGroup.setValue({ ..._.pick(this.vehicle, ['name', 'passenger_capacity', 'child_seat_capacity', 'luggage_capacity', 'baseprice', 'price0to5', 'price5to10', 'price10to15', 'price15plus', 'photos']) })

    }).catch(err => { alert(err.message) })
  }

  handleForm() {
    this.submitting = true
    this.formGroup.disable()
    let photos = []
    if (this.addedPhotos.length !== 0)
      this.addedPhotos.forEach(e => photos.push(e.file))
    this.backend.updateVehicle(this.route.snapshot.params.id, this.formGroup.value, photos).toPromise()
      .then(res => {
        alert(JSON.parse(JSON.stringify(res)).success)
        this.router.navigateByUrl('/vehicles')
      })
      .catch(err => alert(err.message))
      .finally(() => setTimeout(() => {
        this.formGroup.enable()
        this.submitting = false
      }, 1000))

  }

  handlePhotos(e) {
    if (e.target.files.length + this.addedPhotos.length + this.formGroup.get('photos').value.length > 5) {
      alert('Cannot add more than 5 photos.')
      return
    }
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      if (files[i].type === 'image/jpeg' || files[i].type === 'image/png') {
        this.formGroup.markAsDirty()
        let reader = new FileReader();
        reader.onload = () => { this.addedPhotos.push({ file: files[i], url: reader.result as String }) }
        reader.readAsDataURL(files[i])
      }
    }

  }

  removeAddedPhoto(e, index) {
    e.stopPropagation();
    this.addedPhotos.splice(index, 1)
  }

  deletePhoto(e, index) {
    e.stopPropagation();
    this.formGroup.markAsDirty()
    const photos = this.formGroup.get('photos').value;
    photos.splice(index, 1)
    this.formGroup.patchValue({ photos })
  }

}
