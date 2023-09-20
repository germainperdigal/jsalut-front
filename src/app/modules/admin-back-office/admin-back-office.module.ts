import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminBackOfficeRoutingModule } from './admin-back-office-routing.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BackOfficeContainerComponent } from './containers/back-office-container/back-office-container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditionsComponent } from './components/editions/editions.component';
import { UsersComponent } from './components/users/users.component';
import { ComitteeComponent } from './components/comittee/comittee.component';
import { ContentComponent } from './components/content/content.component';
import { CommunicationComponent } from './components/communication/communication.component';
import { ShowcaseResolver } from 'src/app/modules/showcase/resolvers/showcase.resolver';
import { EditionsListResolver } from 'src/app/modules/admin-back-office/resolvers/editions-list.resolver';
import { QuillModule } from 'ngx-quill';
import { UsersListResolver } from 'src/app/modules/admin-back-office/resolvers/users-list.resolver';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserDetailResolver } from 'src/app/modules/admin-back-office/resolvers/user-detail.resolver';
import { MatSelectModule } from '@angular/material/select';
import { EditionCreationComponent } from './components/edition-creation/edition-creation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditionEditionComponent } from './components/edition-edition/edition-edition.component';
import { EditionDetailResolver } from 'src/app/modules/admin-back-office/resolvers/edition-detail.resolver';
import { EditionFileResolver } from 'src/app/modules/admin-back-office/resolvers/edition-file.resolver';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommitteeListResolver } from 'src/app/modules/admin-back-office/resolvers/committee-list.resolver';
import {
  CommitteeMembersListResolver
} from 'src/app/modules/admin-back-office/resolvers/committee-members-list.resolver';
import { MessagesResolver } from 'src/app/modules/admin-back-office/resolvers/messages.resolver';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { UserCreationFormComponent } from './components/user-creation-form/user-creation-form.component';
import { PartnerComponent } from './components/partner/partner.component';
import { PartnersResolver } from 'src/app/modules/admin-back-office/resolvers/partners.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
  declarations: [
    BackOfficeContainerComponent,
    DashboardComponent,
    EditionsComponent,
    UsersComponent,
    ComitteeComponent,
    ContentComponent,
    CommunicationComponent,
    UserDetailComponent,
    EditionCreationComponent,
    EditionEditionComponent,
    LoginContainerComponent,
    UserCreationFormComponent,
    PartnerComponent
  ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatStepperModule,
        MaterialModule,
        MatToolbarModule,
        MatSidenavModule,
        AdminBackOfficeRoutingModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatListModule,
        MatInputModule,
        QuillModule.forRoot(),
        MatSelectModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        NgxPaginationModule,
        DigitOnlyModule,
    ],
  providers: [
    ShowcaseResolver,
    UsersListResolver,
    UserDetailResolver,
    EditionDetailResolver,
    EditionFileResolver,
    CommitteeMembersListResolver,
    PartnersResolver,
    MessagesResolver,
    CommitteeListResolver,
    MatDialogConfig,
    EditionsListResolver,
  ]
})
export class AdminBackOfficeModule { }
