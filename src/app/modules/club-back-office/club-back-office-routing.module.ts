import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ClubBackOfficeContainerComponent
} from 'src/app/modules/club-back-office/containers/club-back-office-container/club-back-office-container.component';
import { DashboardComponent } from 'src/app/modules/club-back-office/components/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guards/auth.service';
import { UserResolver } from 'src/app/modules/club-back-office/resolvers/user.resolver';
import { CurrentEditionResolver } from 'src/app/modules/club-back-office/resolvers/current-edition.resolver';
import { ApplicationsComponent } from 'src/app/modules/club-back-office/components/applications/applications.component';
import { MessagesComponent } from 'src/app/modules/club-back-office/components/messages/messages.component';
import { MessagesResolver } from 'src/app/modules/club-back-office/resolvers/messages.resolver';
import { ApplicationsResolver } from 'src/app/modules/club-back-office/resolvers/applications.resolver';

/** Containers */

const routes: Routes = [
  {
    path: 'club',
    component: ClubBackOfficeContainerComponent,
    resolve: { user: UserResolver },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'accueil',
        pathMatch: 'full'
      },
      {
        path: 'accueil',
        title: 'Jean Salut - Espace club',
        component: DashboardComponent,
        resolve: { currentEdition: CurrentEditionResolver },
      },
      {
        path: 'participations',
        title: 'Jean Salut - Mes candidatures',
        component: ApplicationsComponent,
        resolve: { currentEdition: CurrentEditionResolver, applications: ApplicationsResolver },
      },
      {
        path: 'messages',
        resolve: { messages: MessagesResolver },
        title: 'Jean Salut - Messages',
        component: MessagesComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubBackOfficeRoutingModule { }
