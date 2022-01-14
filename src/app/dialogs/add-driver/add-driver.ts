import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService } from "src/app/services/backend.service";
import { DriverService } from "src/app/services/driver.service";

@Component({
    selector: 'dialog-add-driver',
    templateUrl: 'add-driver.html',
    styleUrls: ['add-driver.scss']
})
export class AddDriverDialog {
    adding: boolean = false
    photo: any;
    driver: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        contact_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    });
    constructor(private driverService: DriverService, private dialog: MatDialogRef<AddDriverDialog>) {

    }

    addDriver() {
        if (this.driver.invalid)
            return
        this.adding = true
        this.driverService.addDriver(this.driver.value, this.photo.file).toPromise().then(res => {
            alert('Driver added successfully')
            this.dialog.close('reload');
        }).catch(err => {
            console.log(err);
            alert(err.error || err.message)
        })
            .finally(() => this.adding = false)

    }

    handlePhotos(e) {
        const file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            let reader = new FileReader();
            reader.onload = () => {
                this.photo = { file: file, url: reader.result as String }
            }
            reader.readAsDataURL(file)
        }

    }

}