import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user.model';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-creation-form',
  templateUrl: './user-creation-form.component.html',
  styleUrls: ['./user-creation-form.component.scss']
})
export class UserCreationFormComponent {
  loading: boolean;

  creationForm = new FormGroup({
    clubName: new FormControl(null, Validators.required),
    emailAddress: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private readonly apiService: ApiService,
    private readonly toastrService: ToastrService,
    private readonly matDialogRef: MatDialogRef<UserCreationFormComponent>
  ) {
  }

  createUser() {
    this.loading = true;

    this.apiService.signUpUser((this.creationForm.value as any), true)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((newUser: User) => {
        this.toastrService.success('Utilisateur créé avec succès !');
        this.matDialogRef.close({newUser});
      });
  }
}
