import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-driver',
  templateUrl: './view-driver.component.html',
  styleUrls: ['./view-driver.component.scss']
})
export class ViewDriverComponent implements OnInit {
  driver: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.driver = data.driver;
  }

  ngOnInit(): void {
  }

}
