import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnknownRouteComponent } from './unknown-route/unknown-route.component';
import { MaterialModule } from '@app/material.module';
import { ErrorRoutingModule } from './error-module-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ErrorRoutingModule
  ],
  declarations: [UnknownRouteComponent]
})
export class ErrorModuleModule { }
