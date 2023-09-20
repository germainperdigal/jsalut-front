import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubBackOfficeRoutingModule } from './club-back-office-routing.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ClubBackOfficeContainerComponent } from './containers/club-back-office-container/club-back-office-container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsComponent } from './components/applications/applications.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MessagesResolver } from 'src/app/modules/club-back-office/resolvers/messages.resolver';
import { ApplicationsResolver } from 'src/app/modules/club-back-office/resolvers/applications.resolver';
import { BrowserModule } from '@angular/platform-browser';
import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
  declarations: [
    ClubBackOfficeContainerComponent,
    DashboardComponent,
    ApplicationsComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserModule,
    DigitOnlyModule,
    MatStepperModule,
    MaterialModule,
    MatToolbarModule,
    MatSidenavModule,
    ClubBackOfficeRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    MessagesResolver,
  ]
})
export class ClubBackOfficeModule { }
