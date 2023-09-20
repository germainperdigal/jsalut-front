import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-club-back-office-container',
  templateUrl: './club-back-office-container.component.html',
  styleUrls: ['./club-back-office-container.component.scss']
})
export class ClubBackOfficeContainerComponent {
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
      path: '/club/accueil'
    },
    {
      label: 'Mes candidatures',
      icon: 'assignment',
      path: '/club/participations'
    },
    {
      label: 'Message',
      icon: 'message',
      path: '/club/messages'
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
