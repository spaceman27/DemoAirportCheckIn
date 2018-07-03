import { Component, OnInit, Input } from '@angular/core';
import { GroupCheckinService } from '../group-checkin.service';
import { CheckInModel } from '../../app.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent implements OnInit {
  @Input() group: CheckInModel;
  children: any[];
  filter: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.children = this.group['links']['children']['linkedEntities'];
  }

  navToCheckin(item: CheckInModel) {
    this.router.navigate([`groups/checkin/${item.id}`], { replaceUrl: true });
  }
}
