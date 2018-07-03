import { Component, OnInit, Inject } from '@angular/core';
import { CheckinService } from '../checkin.service';
import { map, filter, mergeMap, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddFlightDialogComponent } from './add-flight-dialog/add-flight-dialog.component';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  flights: string[];
  myControl = new FormControl();
  options: string[] = ['Flight One', 'Flight Two', 'Flight Three', 'Flight Four', 'Flight Five', 'Flight Six', 'Flight Seven', 'Flight Eight'];
  filteredOptions: Observable<string[]>;
  constructor(private service: CheckinService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddFlightDialogComponent, {
      width: '350px',
      data: {name: 'dad', animal: 'asdas'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnInit() {
    this.service.getFlights().subscribe((r: any) => {
      this.flights = r;
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
