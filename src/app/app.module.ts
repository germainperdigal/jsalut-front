import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Modules */
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ApiService } from 'src/app/services/api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { AuthGuard } from 'src/app/guards/auth.service';
import { AuthService } from 'src/app/services/auth.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { UserResolver } from 'src/app/modules/club-back-office/resolvers/user.resolver';
import { CurrentEditionResolver } from 'src/app/modules/club-back-office/resolvers/current-edition.resolver';
import { AdminAuthGuard } from 'src/app/guards/admin-auth.service';
import { CommitteeListResolver } from 'src/app/modules/admin-back-office/resolvers/committee-list.resolver';
import { JurorAuthGuard } from 'src/app/guards/juror-auth.service';
import { MessagesResolver } from 'src/app/modules/club-back-office/resolvers/messages.resolver';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationsResolver } from 'src/app/modules/club-back-office/resolvers/applications.resolver';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgxPaginationModule } from 'ngx-pagination';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    AuthService,
    UserResolver,
    CommitteeListResolver,
    CurrentEditionResolver,
    MessagesResolver,
    ApplicationsResolver,
    AdminAuthGuard,
    JurorAuthGuard,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuard,
    {provide: LOCALE_ID, useValue: 'fr' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
