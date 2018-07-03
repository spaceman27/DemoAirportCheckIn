import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupCheckinComponent } from './group-checkin.component';
import { GroupCheckinService } from './group-checkin.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroupCheckInPipe } from './group-checkin.pipe';
import { GroupCardComponent } from './group-card/group-card.component';
import { CheckinComponent } from './checkin/checkin.component';
import { CheckinPreviewComponent } from './checkin/checkin-preview/checkin-preview.component';
import { GroupRoutingModule } from '../group-checkin/group-checkin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateComponent } from './checkin/template/template.component';
import { DashpanelComponent } from './checkin/dashpanel/dashpanel.component';
import { FlightsComponent } from './checkin/flights/flights.component';
import { AddFlightDialogComponent } from './checkin/flights/add-flight-dialog/add-flight-dialog.component';
import { AddTemplateDialogComponent } from './checkin/template/add-template-dialog/add-template-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    GroupRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GroupCheckinComponent, GroupCheckInPipe, GroupCardComponent, CheckinComponent,
    CheckinPreviewComponent, FlightsComponent, TemplateComponent, DashpanelComponent, AddFlightDialogComponent, AddTemplateDialogComponent],
  providers: [
    GroupCheckinService,
    GroupCheckInPipe
  ],
  entryComponents: [AddFlightDialogComponent, AddTemplateDialogComponent],
  exports: [GroupCheckinComponent, GroupCardComponent]
})
export class GroupCheckinModule { }
