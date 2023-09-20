import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  /** User */
  user: User;

  /** User form */
  userForm: FormGroup;

  /** Loading */
  loading: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly toastrService: ToastrService,
  ) {
    this.route.data.subscribe(({user}) => {
      this.user = user;

      this.userForm = new FormGroup<any>({
        role: new FormControl(user.role, Validators.required),
        clubName: new FormControl(user.clubName, Validators.required),
        phoneNumber: new FormControl(user.phoneNumber, Validators.required),
        emailAddress: new FormControl(user.emailAddress, Validators.required)
      });
    })
  }

  /** Update user */
  updateUser() {
    this.loading = true;

    this.apiService.updateUser(this.userForm.value, this.user._id)
      .pipe(
        finalize(() => this.loading = false)
      )
    .subscribe(() => {
      this.toastrService.success(`${this.user.clubName} mis à jour !`);
      this.user = this.userForm.value;
    })
  }
}
