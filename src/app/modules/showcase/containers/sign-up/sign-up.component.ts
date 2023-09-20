import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { filter } from 'rxjs';
import { Showcase } from 'src/app/models/showcase.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  /** Current edition */
  currentEdition: any;

  /** Showcase */
  showCase: Showcase;

  /** Sign up form */
  signUpForm: FormGroup = new FormGroup({
    clubName: new FormControl(null, Validators.required),
    emailAddress: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    firstNamePlayer: new FormControl(null),
    lastNamePlayer: new FormControl(),
    emailAddressPlayer: new FormControl(),
    phoneNumberPlayer: new FormControl(),
  });

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.parent?.data.subscribe(({showCase}) => {
      this.showCase = showCase;
    })

    this.route.data.pipe(filter(({currentEdition}) => !!currentEdition)).subscribe(({currentEdition}) => {
      this.currentEdition = currentEdition;
      this.signUpForm.get('firstNamePlayer')?.addValidators(Validators.required);
      this.signUpForm.get('lastNamePlayer')?.addValidators(Validators.required);
      this.signUpForm.get('emailAddressPlayer')?.addValidators(Validators.required);
      this.signUpForm.get('phoneNumberPlayer')?.addValidators(Validators.required);
    });
  }

  //@TODO : si édition en cours alors proposer le début de l'inscription du joueur

  /** On submit */
  onSubmit() {
    const { emailAddress, clubName, phoneNumber, password, firstNamePlayer, lastNamePlayer, emailAddressPlayer, phoneNumberPlayer } = this.signUpForm.value;

    this.apiService.signUpUser({emailAddress, clubName, phoneNumber, password} as User)
      .subscribe(() => {
        this.toastrService.success('Inscription réussie, vous pouvez dès à présent vous connecter à votre espace Club !');

        if (this.currentEdition) {
          this.apiService.logUser(emailAddress, password).subscribe((auth: {token: string}) => {
            localStorage.setItem('auth-token', auth.token);

            this.apiService.apply({ firstNamePlayer, lastNamePlayer, emailAddressPlayer, phoneNumberPlayer })
              .subscribe((application) => {
                this.toastrService.success('Votre joueur a bien été inscrit également, sa candidature est à compléter sur votre espace Club !');
              });
          });
        }

        this.router.navigateByUrl('/connexion');
      }, (error) => {
        this.toastrService.error('Une erreur est survenue lors de l\'inscription.');
      });
  }
}
