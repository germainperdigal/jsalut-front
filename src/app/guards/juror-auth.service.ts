import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JurorAuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService
  ) {}

  canActivate(): boolean {
    if (!this.authService.isJurorAuthenticated()) {
      this.router.navigateByUrl('/juge/connexion');
      this.toastrService.error('Vous devez être authentifiés et avoir les droits nécessaires pour accéder à l\'espace comité.')
      return false;
    }

    return true;
  }
}
