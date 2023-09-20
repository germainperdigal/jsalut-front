import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BackOfficeContainerComponent
} from 'src/app/modules/admin-back-office/containers/back-office-container/back-office-container.component';
import { UserResolver } from 'src/app/modules/club-back-office/resolvers/user.resolver';
import { AdminAuthGuard } from 'src/app/guards/admin-auth.service';
import { DashboardComponent } from 'src/app/modules/admin-back-office/components/dashboard/dashboard.component';
import { EditionsComponent } from 'src/app/modules/admin-back-office/components/editions/editions.component';
import { UsersComponent } from 'src/app/modules/admin-back-office/components/users/users.component';
import { ComitteeComponent } from 'src/app/modules/admin-back-office/components/comittee/comittee.component';
import { ContentComponent } from 'src/app/modules/admin-back-office/components/content/content.component';
import {
  CommunicationComponent
} from 'src/app/modules/admin-back-office/components/communication/communication.component';
import { ShowcaseResolver } from 'src/app/modules/showcase/resolvers/showcase.resolver';
import { EditionsListResolver } from 'src/app/modules/admin-back-office/resolvers/editions-list.resolver';
import { UsersListResolver } from 'src/app/modules/admin-back-office/resolvers/users-list.resolver';
import { UserDetailComponent } from 'src/app/modules/admin-back-office/components/user-detail/user-detail.component';
import { UserDetailResolver } from 'src/app/modules/admin-back-office/resolvers/user-detail.resolver';
import {
  EditionCreationComponent
} from 'src/app/modules/admin-back-office/components/edition-creation/edition-creation.component';
import {
  EditionEditionComponent
} from 'src/app/modules/admin-back-office/components/edition-edition/edition-edition.component';
import { EditionDetailResolver } from 'src/app/modules/admin-back-office/resolvers/edition-detail.resolver';
import { CommitteeListResolver } from 'src/app/modules/admin-back-office/resolvers/committee-list.resolver';
import {
  CommitteeMembersListResolver
} from 'src/app/modules/admin-back-office/resolvers/committee-members-list.resolver';
import { MessagesResolver } from 'src/app/modules/admin-back-office/resolvers/messages.resolver';
import {
  LoginContainerComponent
} from 'src/app/modules/admin-back-office/containers/login-container/login-container.component';
import { PartnerComponent } from 'src/app/modules/admin-back-office/components/partner/partner.component';
import { PartnersResolver } from 'src/app/modules/admin-back-office/resolvers/partners.resolver';
import { EditionFileResolver } from 'src/app/modules/admin-back-office/resolvers/edition-file.resolver';

/** Containers */

const routes: Routes = [
  {
    path: '',
    resolve: { user: UserResolver },
    component: BackOfficeContainerComponent,
    canActivate: [ AdminAuthGuard ],
    children: [
      {
        path: '',
        redirectTo: 'accueil',
        pathMatch: 'full'
      },
      {
        path: 'accueil',
        resolve: { users: UsersListResolver, editions: EditionsListResolver },
        component: DashboardComponent,
      },
      {
        path: 'editions',
        resolve: { editions: EditionsListResolver },
        component: EditionsComponent,
      },
      {
        path: 'editions/creer',
        component: EditionCreationComponent,
      },
      {
        path: 'editions/:id',
        resolve: { edition: EditionDetailResolver, files: EditionFileResolver },
        component: EditionEditionComponent,
      },
      {
        path: 'utilisateurs',
        component: UsersComponent,
        resolve: { users: UsersListResolver },
      },
      {
        path: 'utilisateurs/:id',
        resolve: { user: UserDetailResolver },
        component: UserDetailComponent,
      },
      {
        path: 'comite',
        resolve: { committeeList: CommitteeListResolver, committeeMembersList: CommitteeMembersListResolver },
        component: ComitteeComponent
      },
      {
        path: 'contenu',
        resolve: { showcase: ShowcaseResolver },
        component: ContentComponent
      },
      {
        path: 'partenaires',
        resolve: { partners: PartnersResolver },
        component: PartnerComponent
      },
      {
        path: 'messages',
        resolve: { communications: MessagesResolver },
        component: CommunicationComponent,
      }
    ]
  },
  {
    path: 'connexion',
    component: LoginContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBackOfficeRoutingModule { }
