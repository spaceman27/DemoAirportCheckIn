import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { GroupCheckinComponent } from '../group-checkin/group-checkin.component';
import { CheckinComponent } from './checkin/checkin.component';

const routes: Routes = [
  Route.withShell([
    { path: 'groups', component: GroupCheckinComponent, data: { title: extract('Groups Checkin') }},
    { path: 'groups/checkin/:id', component: CheckinComponent, data: { title: extract('Checkin') }}
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GroupRoutingModule { }
