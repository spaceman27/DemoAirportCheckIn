import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CheckInModel } from '../../app.model';

@Component({
  selector: 'app-checkin-preview',
  templateUrl: './checkin-preview.component.html',
  styleUrls: ['./checkin-preview.component.scss']
})
export class CheckinPreviewComponent implements OnInit, OnChanges {
  @Input() checkin: CheckInModel;
  lstFields: string[];
  fields: string;
  templates: string;
  flights: string;

  constructor() { }

  ngOnChanges(change: any) {
    if (change.checkin && change.checkin.currentValue) {
      this.lstFields = [];
      // tslint:disable-next-line:forin
      for (const item in this.checkin.fields) {
        this.lstFields.push(item);
      }
      this.fields = this.lstFields.join(', ');
      this.templates = ['Class of service', 'Class of service yellow', 'Test of check in template 1', 'Test of check in template 2'].join(', ');
      this.flights = ['Dl1100', 'AA1258', 'DT4558', 'LI6561', 'MH2145'].join(', ');
    }
  }
  ngOnInit() {

  }
}
