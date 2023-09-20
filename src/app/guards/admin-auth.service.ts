import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAdminAuthenticated()) {
      this.router.navigateByUrl('/admin/connexion');
      this.toastrService.error('Vous devez être authentifiés et avoir les droits nécessaires pour accéder à l\'espace admin.')
      return false;
    }

    return true;
  }
}
