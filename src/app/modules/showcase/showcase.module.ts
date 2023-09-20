import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowcaseRoutingModule } from './showcase-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './containers/homepage/homepage.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommitteeComponent } from './containers/committee/committee.component';
import { CommitteeCardComponent } from './components/committee-card/committee-card.component';
import { EditionComponent } from './containers/edition/edition.component';
import { RulesComponent } from './containers/rules/rules.component';
import { ContactComponent } from './containers/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ClubComponent } from './containers/club/club.component';
import { ShowcaseResolver } from 'src/app/modules/showcase/resolvers/showcase.resolver';
import { TrophyComponent } from './containers/trophy/trophy.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PartnersComponent } from './containers/partners/partners.component';
import { EditionsResolver } from 'src/app/modules/showcase/resolvers/editions.resolver';
import { ShowcaseComponent } from './containers/showcase/showcase.component';
import { PartnersResolver } from 'src/app/modules/showcase/resolvers/partners.resolver';
import { PartnerComponent } from './components/partner/partner.component';
import { PartnerResolver } from 'src/app/modules/showcase/resolvers/partner.resolver';
import { MatDialogModule } from '@angular/material/dialog';
import { CommitteeMemberDescComponent } from './components/committee-member-desc/committee-member-desc.component';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { LightboxModule } from 'ngx-lightbox';
import { GalleryResolver } from 'src/app/modules/showcase/resolvers/gallery.resolver';

@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent,
    MenuComponent,
    FooterComponent,
    CommitteeComponent,
    CommitteeCardComponent,
    EditionComponent,
    RulesComponent,
    ContactComponent,
    SignUpComponent,
    ClubComponent,
    TrophyComponent,
    GalleryComponent,
    PartnersComponent,
    ShowcaseComponent,
    PartnerComponent,
    CommitteeMemberDescComponent
  ],
  providers: [
    ShowcaseResolver,
    PartnersResolver,
    PartnerResolver,
    GalleryResolver,
    EditionsResolver
  ],
  imports: [
    CommonModule,
    ShowcaseRoutingModule,
    LightboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    DigitOnlyModule,
  ]
})
export class ShowcaseModule { }
