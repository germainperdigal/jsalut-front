import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-back-office-container',
  templateUrl: './back-office-container.component.html',
  styleUrls: ['./back-office-container.component.scss']
})
export class BackOfficeContainerComponent {
  /** Opened */
  opened: boolean = true;

  /** User */
  user: User;

  get currentRoute(): string {
    return this.router.url;
  }

  /** Nav links */
  navLinks = [
    {
      label: 'Accueil',
      icon: 'home',
      path: '/admin/accueil'
    },
    {
      label: 'Éditions',
      icon: 'calendar_today',
      path: '/admin/editions'
    },
    {
      label: 'Utilisateurs',
      icon: 'people',
      path: '/admin/utilisateurs'
    },
    {
      label: 'Comité',
      icon: 'stars',
      path: '/admin/comite'
    },
    {
      label: 'Contenu',
      icon: 'edit',
      path: '/admin/contenu'
    },
    {
      label: 'Communication',
      icon: 'message',
      path: '/admin/messages'
    },
    {
      label: 'Partenaires',
      icon: 'handshake',
      path: '/admin/partenaires'
    }
  ]

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
  ) {
    this.route?.data
      .subscribe(({user}) => {
        this.user = user;
      });
  }

  logOut() {
    this.router.navigateByUrl('/');
    localStorage.removeItem('auth-token');
    this.toastrService.success('À bientôt !')
  }
}
