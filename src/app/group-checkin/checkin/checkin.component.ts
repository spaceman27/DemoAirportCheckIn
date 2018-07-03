import { Component, OnInit } from '@angular/core';
import { CheckinService } from './checkin.service';
import { CheckInModel } from '../../app.model';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { map, filter, mergeMap, startWith } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  checkin: CheckInModel;

  fields: any[];
  classOfService: string[];

  constructor(private router: Router, private activatedroute: ActivatedRoute, private service: CheckinService, private titleService: Title) { }

  ngOnInit() {
    const id = this.activatedroute.snapshot.params['id'];
    this.service.getCheckin(id).subscribe((r: CheckInModel) => {
      this.checkin = r;
      this.fields = [];
      // tslint:disable-next-line:forin
      for (const item in r.fields) {
          this.fields.push(r.fields[item][0]);
      }
      this.titleService.setTitle(this.checkin.key);
    });
    this.classOfService = ['Economy', 'Business', 'Royal'];
  }
}
