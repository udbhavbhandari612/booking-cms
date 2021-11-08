import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  vehicle: any;
  error: any;
  addedPhotos: any[] = [];
  submitting: boolean = false;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required, Validators.min(5), Validators.max(15)]),
    baseprice: new FormControl('', [Validators.required, Validators.min(0)]),
    price0to5: new FormControl('', [Validators.required, Validators.min(0)]),
    price5to10: new FormControl('', [Validators.required, Validators.min(0)]),
    price10to15: new FormControl('', [Validators.required, Validators.min(0)]),
    price15plus: new FormControl('', [Validators.required, Validators.min(0)])
  })

  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
  }


  handleForm() {
    if (this.addedPhotos.length === 0) {
      alert("You must add photos before you proceed")
      return
    }

    this.submitting = true
    this.formGroup.disable()
    this.backend.addVehicle(this.formGroup.value, this.addedPhotos.map(e => e.file)).toPromise()
      .then(res => {
        alert(JSON.parse(JSON.stringify(res)).success)
        this.router.navigateByUrl('/vehicles')
      })
      .catch(err => {
        console.log(err);
        alert(err.message)
      })
      .finally(() => setTimeout(() => {
        this.formGroup.enable()
        this.submitting = false
      }, 1000))

  }

  handlePhotos(e) {
    if (e.target.files.length + this.addedPhotos.length > 5) {
      alert('Cannot add more than 5 photos.')
      return
    }
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      if (files[i].type === 'image/jpeg' || files[i].type === 'image/png') {
        let reader = new FileReader();
        reader.onload = () => { this.addedPhotos.push({ file: files[i], url: reader.result as String }) }
        reader.readAsDataURL(files[i])
      }
    }

  }

  deletePhoto(e, index) {
    e.stopPropagation();
    this.addedPhotos.splice(index, 1)
  }

}