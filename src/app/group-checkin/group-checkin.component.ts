import { Component, OnInit } from '@angular/core';
import { GroupCheckinService } from './group-checkin.service';
import { CheckInModel } from '../app.model';

@Component({
  selector: 'app-group-checkin',
  templateUrl: './group-checkin.component.html',
  styleUrls: ['./group-checkin.component.scss']
})
export class GroupCheckinComponent implements OnInit {
  lstGroups: CheckInModel[];
  pagingGroup: CheckInModel[];
  filter: string;
  page: number;
  pageSize: number;
  totalPage: number;
  constructor(private service: GroupCheckinService) { }

  ngOnInit() {
    this.service.getGroupCheckin().subscribe((r: CheckInModel[]) => {
      console.log(r);
      this.page = 1;
      this.pageSize = 3;
      this.lstGroups = r;
      this.totalPage = Math.ceil(this.lstGroups.length / this.pageSize);
      this.paging(this.page);
    });
  }
  paging(page: number) {
    this.pagingGroup = this.lstGroups.slice( (this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  navLeft() {
    if (this.page > 1) {
      this.page--;
      this.paging(this.page);
    }
  }
  navRight() {
    if (this.page < this.totalPage ) {
      this.page++;
      this.paging(this.page);
    }
  }
}

