import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RushHourDialogComponent } from 'src/app/dialogs/rush-hour-dialog/rush-hour-dialog.component';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  misc: FormGroup = new FormGroup(
    {
      terms_and_conditions: new FormControl('', [Validators.required]),
      logo: new FormControl(''),
      phone_no: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    },
  );
  uploading: boolean = false;
  logo: any;

  constructor(
    private dialog: MatDialog,
    private backend: BackendService
  ) { }

  ngOnInit(): void {
    this.fetchMisc();
  }

  fetchMisc() {
    this.backend.fetchMiscellaneous().subscribe(res => {
      this.misc.patchValue({ ...res[0] });
    }, err => {
      alert(err.message)
      console.log(err);

    })
  }

  handlePhoto(event) {
    let reader = new FileReader();
    reader.onload = () => { this.logo = { file: event.target.files[0], url: reader.result as String } }
    reader.readAsDataURL(event.target.files[0])

  }

  submitMisc() {
    this.backend.createMiscellaneous(this.misc.value, this.logo?.file).subscribe(res => {
      alert('Updated successfully');
      this.misc.markAsPristine();
    }, err => {
      alert(err.message)
      console.log(err);

    })
  }

  setRushHoursAndFare() {
    this.dialog.open(RushHourDialogComponent)

  }

}
