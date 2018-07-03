import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckinComponent } from './checkin.component';
import { CheckinRoutingModule } from './checkin-routing.module';
import { CheckinService } from './checkin.service';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CheckinPreviewComponent } from './checkin-preview/checkin-preview.component';

@NgModule({
  imports: [
    CommonModule,
    CheckinRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [CheckinComponent, CheckinPreviewComponent],
  providers: [
    CheckinService
  ]
})
export class CheckinModule { }
