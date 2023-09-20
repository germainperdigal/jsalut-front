import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Showcase } from 'src/app/models/showcase.model';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent {
  /** Showcase */
  showCase: Showcase;

  /** Login form */
  loginForm = new FormGroup({
    emailAddress: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private readonly apiService: ApiService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly auth: AuthService,
  ) {
    if (this.auth.isJurorAuthenticated()) {
      this.router.navigateByUrl('/juge/candidatures');

      return;
    }

    this.route.data.subscribe(({showCase}) => {
      this.showCase = showCase;
    })
  }

  /** On submit */
  onSubmit() {
    const { emailAddress, password } = this.loginForm.value;

    // @ts-ignore
    this.apiService.logUser(emailAddress, password)
      .subscribe((auth: {token: string}) => {
        if (this.auth.getRole(auth.token) !== 'JUROR') {
          this.toastrService.error('Vous n\'avez pas les droits nécessaires pour accéder à cet espace.');

          return;
        }

        this.toastrService.success('Bienvenue !');
        this.router.navigateByUrl('/juge/candidatures');
        localStorage.setItem('auth-token', auth.token);
      }, (error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message)
      });
  }
}
