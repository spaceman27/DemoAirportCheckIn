import { Component, OnInit } from '@angular/core';
import { CheckinService } from './checkin.service';
import { CheckInModel } from '../app.model';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { map, filter, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  checkin: CheckInModel;
  templates: string[];
  flights: string[];
  fields: any[];
  classOfService: string[];
  constructor(private router: Router, private activatedroute: ActivatedRoute, private service: CheckinService, private titleService: Title) { }

  ngOnInit() {
    const id = this.activatedroute.snapshot.params['id'];
    this.service.getCheckin(id).subscribe((r: CheckInModel) => {
      console.log(r);
      this.checkin = r;
      this.fields = [];
      // tslint:disable-next-line:forin
      for (const item in r.fields) {
          this.fields.push(r.fields[item][0]);
      }
      this.titleService.setTitle(this.checkin.key);
    });
    this.templates = ['Class of service', 'Class of service yellow', 'Test of check in template 1', 'Test of check in template 2'];
    this.flights = ['Dl1100', 'AA1258', 'DT4558', 'LI6561', 'MH2145'];
    this.classOfService = ['Economy', 'Business', 'Royal'];
  }

}
