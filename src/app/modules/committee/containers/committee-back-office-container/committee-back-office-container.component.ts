import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-committee-back-office-container',
  templateUrl: './committee-back-office-container.component.html',
  styleUrls: ['./committee-back-office-container.component.scss']
})
export class CommitteeBackOfficeContainerComponent {
  /** Opened */
  opened: boolean = true;

  /** User */
  user: User;

  get currentRoute(): string {
    return this.router.url;
  }

  /** Nav links */
  navLinks = [
    /*{
      label: 'Accueil',
      icon: 'home',
      path: '/juge/accueil'
    },*/
    {
      label: 'Candidatures',
      icon: 'assignment',
      path: '/juge/candidatures'
    },
    {
      label: 'Messages',
      icon: 'messages',
      path: '/juge/messages'
    },
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
