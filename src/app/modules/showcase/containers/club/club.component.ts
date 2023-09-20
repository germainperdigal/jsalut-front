import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent {
  /** Login form */
  loginForm = new FormGroup({
    emailAddress: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
  ) {
    if (this.authService.isClubAuthenticated()) {
      this.router.navigateByUrl('/club/accueil');
    }
  }

  /** On submit */
  onSubmit() {
    const { emailAddress, password } = this.loginForm.value as {emailAddress?: string; password?: string;};

    this.apiService.logUser(emailAddress, password)
      .subscribe((auth: {token: string}) => {
        if (this.authService.getRole(auth.token) !== 'CLUB') {
          this.toastrService.error('Seuls les clubs peuvent accéder à l\'espace club.');

          return;
        }

        this.toastrService.success('Bienvenue !');
        this.router.navigateByUrl('/club/accueil');
        localStorage.setItem('auth-token', auth.token);
      }, (error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message)
      });
  }
}
