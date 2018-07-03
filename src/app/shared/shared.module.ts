import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    LoaderComponent,
    BreadcrumbsComponent
  ],
  exports: [
    LoaderComponent, BreadcrumbsComponent
  ],
  providers: []
})
export class SharedModule { }
