import { Component, OnInit } from '@angular/core';
import { CheckinService } from '../checkin.service';
import { map, filter, mergeMap, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddTemplateDialogComponent } from './add-template-dialog/add-template-dialog.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  templates: string[];
  constructor(private service: CheckinService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTemplateDialogComponent, {
      width: '350px',
      data: {name: 'dad', animal: 'asdas'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnInit() {
    this.service.getTemplates().subscribe((r: any) => {
      this.templates = r;
    });
  }

}
