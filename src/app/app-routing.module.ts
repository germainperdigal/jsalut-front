import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubBackOfficeRoutingModule } from 'src/app/modules/club-back-office/club-back-office-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/showcase/showcase.module').then(m => m.ShowcaseModule)
  },
  {
    path: 'club',
    loadChildren: () => import('./modules/club-back-office/club-back-office.module').then(m => m.ClubBackOfficeModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin-back-office/admin-back-office.module').then(m => m.AdminBackOfficeModule)
  },
  {
    path: 'juge',
    loadChildren: () => import('./modules/committee/committee.module').then(m => m.CommitteeModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ClubBackOfficeRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
