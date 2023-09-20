import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent {
  /** Login form */
  loginForm = new FormGroup({
    emailAddress: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private readonly apiService: ApiService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private readonly auth: AuthService,
  ) {
    if (this.auth.isAdminAuthenticated()) {
      this.router.navigateByUrl('/admin/accueil');
    }
  }

  /** On submit */
  onSubmit() {
    const { emailAddress, password } = this.loginForm.value;

    // @ts-ignore
    this.apiService.logUser(emailAddress, password)
      .subscribe((auth: {token: string}) => {
        if (this.auth.getRole(auth.token) !== 'ADMIN') {
          this.toastrService.error('Vous n\'avez pas les droits nécessaires pour accéder à cet espace');

          return;
        }

        this.toastrService.success('Bienvenue !');
        this.router.navigateByUrl('/admin/accueil');
        localStorage.setItem('auth-token', auth.token);
      }, (error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message)
      });
  }
}
