import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService
  ) {}

  canActivate(): boolean {
    if (!this.authService.isClubAuthenticated()) {
      this.router.navigateByUrl('/connexion');
      this.toastrService.error('Vous devez être authentifiés pour accéder à l\'espace club.')
      return false;
    }

    return true;
  }
}
