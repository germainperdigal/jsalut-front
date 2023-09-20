import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edition-creation',
  templateUrl: './edition-creation.component.html',
  styleUrls: ['./edition-creation.component.scss']
})
export class EditionCreationComponent {
  /** Loading */
  loading: boolean;

  /** Creation form */
  creationForm = new FormGroup({
    year: new FormControl( new Date().getFullYear(), Validators.required),
    applicationEndsAt: new FormControl(null, Validators.required)
  })

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
  ) {
  }

  /** On create */
  onCreate() {
    this.apiService.createEdition(this.creationForm.value)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(() => {
        this.toastrService.success('Édition créée.')
      })
  }
}
