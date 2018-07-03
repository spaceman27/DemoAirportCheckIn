import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { UnknownRouteComponent } from './unknown-route/unknown-route.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '**', component: UnknownRouteComponent, data: { title: extract('Error Route') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ErrorRoutingModule { }
