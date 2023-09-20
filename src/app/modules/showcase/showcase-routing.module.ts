import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from 'src/app/modules/showcase/containers/homepage/homepage.component';
import { CommitteeComponent } from 'src/app/modules/showcase/containers/committee/committee.component';
import { EditionComponent } from 'src/app/modules/showcase/containers/edition/edition.component';
import { RulesComponent } from 'src/app/modules/showcase/containers/rules/rules.component';
import { ContactComponent } from 'src/app/modules/showcase/containers/contact/contact.component';
import { SignUpComponent } from 'src/app/modules/showcase/containers/sign-up/sign-up.component';
import { ClubComponent } from 'src/app/modules/showcase/containers/club/club.component';
import { ShowcaseResolver } from 'src/app/modules/showcase/resolvers/showcase.resolver';
import { PartnersComponent } from 'src/app/modules/showcase/containers/partners/partners.component';
import { EditionsResolver } from 'src/app/modules/showcase/resolvers/editions.resolver';
import { ShowcaseComponent } from 'src/app/modules/showcase/containers/showcase/showcase.component';
import { CommitteeListResolver } from 'src/app/modules/admin-back-office/resolvers/committee-list.resolver';
import { CurrentEditionResolver } from 'src/app/modules/club-back-office/resolvers/current-edition.resolver';
import { PartnersResolver } from 'src/app/modules/showcase/resolvers/partners.resolver';
import { PartnerComponent } from 'src/app/modules/showcase/components/partner/partner.component';
import { PartnerResolver } from 'src/app/modules/showcase/resolvers/partner.resolver';
import { TrophyComponent } from 'src/app/modules/showcase/containers/trophy/trophy.component';
import { GalleryResolver } from 'src/app/modules/showcase/resolvers/gallery.resolver';
import { GalleryComponent } from 'src/app/modules/showcase/components/gallery/gallery.component';

const routes: Routes = [
  {
    path: '',
    component: ShowcaseComponent,
    resolve: { showCase: ShowcaseResolver, gallery: GalleryResolver, partners: PartnersResolver },
    children: [
      { path: '', component: HomepageComponent, resolve: { currentEdition: CurrentEditionResolver } , data: { hideSocial: true }, title: 'Trophée Jean Salut' },
      { path: 'comite', component: CommitteeComponent, resolve: { committees: CommitteeListResolver }, title: 'Jean Salut - Comité' },
      { path: 'editions', component: EditionComponent, resolve: { editions: EditionsResolver }, title: 'Jean Salut - Édition' },
      { path: 'reglement', component: RulesComponent, title: 'Jean Salut - Règlement' },
      { path: 'galerie', component: GalleryComponent, title: 'Jean Salut - Galerie' },
      { path: 'nous-contacter', component: ContactComponent, title: 'Jean Salut - Nous contacter' },
      { path: 'connexion', component: ClubComponent, title: 'Jean Salut - Connexion' },
      { path: 'le-trophee', component: TrophyComponent, title: 'Jean Salut - Le Trophée' },
      { path: 'inscription', component: SignUpComponent, resolve: { currentEdition: CurrentEditionResolver }, title: 'Jean Salut - Inscription' },
      { path: 'partenaires', component: PartnersComponent, resolve: { partners: PartnersResolver }, title: 'Jean Salut - Partenaires' },
      { path: 'partenaire/:id', component: PartnerComponent, resolve: { partner: PartnerResolver }, title: 'Jean Salut - Partenaire' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowcaseRoutingModule { }
