import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CommitteeBackOfficeContainerComponent
} from 'src/app/modules/committee/containers/committee-back-office-container/committee-back-office-container.component';
import { DashboardComponent } from 'src/app/modules/committee/components/dashboard/dashboard.component';
import { UserResolver } from 'src/app/modules/club-back-office/resolvers/user.resolver';
import {
  LoginContainerComponent
} from 'src/app/modules/committee/containers/login-container/login-container.component';
import { JurorAuthGuard } from 'src/app/guards/juror-auth.service';
import { CurrentEditionResolver } from 'src/app/modules/club-back-office/resolvers/current-edition.resolver';
import {
  CurrentEditionApplicationResolver
} from 'src/app/modules/committee/resolvers/current-edition-application.resolver';
import { ApplicationsComponent } from 'src/app/modules/committee/components/applications/applications.component';
import {
  ApplicationDetailsComponent
} from 'src/app/modules/committee/components/application-details/application-details.component';
import { ApplicationResolver } from 'src/app/modules/committee/resolvers/application.resolver';
import { MessagesComponent } from 'src/app/modules/committee/components/messages/messages.component';
import { MessagesResolver } from 'src/app/modules/committee/resolvers/messages.resolver';
import { ShowcaseResolver } from 'src/app/modules/showcase/resolvers/showcase.resolver';

/** Containers */

const routes: Routes = [
  {
    path: 'connexion',
    component: LoginContainerComponent,
    resolve: { showCase: ShowcaseResolver},
  },
  {
    path: '',
    component: CommitteeBackOfficeContainerComponent,
    resolve: { user: UserResolver, currentApplications: CurrentEditionApplicationResolver, currentEdition: CurrentEditionResolver },
    canActivate: [ JurorAuthGuard ],
    children: [
      {
        path: '',
        redirectTo: 'candidatures',
        pathMatch: 'full'
      },
      {
        path: 'candidatures',
        component: ApplicationsComponent
      },
      {
        path: 'messages',
        resolve: { messages: MessagesResolver },
        component: MessagesComponent
      },
      {
        path: 'candidatures/:id',
        resolve: { application: ApplicationResolver },
        component: ApplicationDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommitteeRoutingModule { }
