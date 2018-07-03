import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { CheckinComponent } from './checkin.component';

const routes: Routes = [
  { path: '', component: CheckinComponent, data: { title: extract('checkin') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CheckinRoutingModule { }
