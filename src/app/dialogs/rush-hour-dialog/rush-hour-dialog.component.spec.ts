import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RushHourDialogComponent } from './rush-hour-dialog.component';

describe('RushHourDialogComponent', () => {
  let component: RushHourDialogComponent;
  let fixture: ComponentFixture<RushHourDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RushHourDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RushHourDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
