import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitteeRoutingModule } from './committee-routing.module';
import { CommitteeBackOfficeContainerComponent } from './containers/committee-back-office-container/committee-back-office-container.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import {
  CurrentEditionApplicationResolver
} from 'src/app/modules/committee/resolvers/current-edition-application.resolver';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ApplicationDetailsComponent } from './components/application-details/application-details.component';
import { ApplicationResolver } from 'src/app/modules/committee/resolvers/application.resolver';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MessagesComponent } from './components/messages/messages.component';
import { MessagesResolver } from 'src/app/modules/committee/resolvers/messages.resolver';
import { ShowcaseResolver } from 'src/app/modules/showcase/resolvers/showcase.resolver';


@NgModule({
  declarations: [
    CommitteeBackOfficeContainerComponent,
    DashboardComponent,
    LoginContainerComponent,
    ApplicationsComponent,
    ApplicationDetailsComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    CommitteeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
  ],
  providers: [
    CurrentEditionApplicationResolver,
    ApplicationResolver,
    ShowcaseResolver,
    MessagesResolver,
  ]
})
export class CommitteeModule { }
