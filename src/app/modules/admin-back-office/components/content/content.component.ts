import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Showcase } from 'src/app/models/showcase.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  /** Show case */
  showCase: Showcase;

  /** Edit form */
  editForm: FormGroup;

  /** Loading */
  loading: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toastrService: ToastrService,
    private readonly apiService: ApiService,
  ) {
    this.route.data.subscribe(({showcase}) => {
      this.showCase = showcase;
      this.buildForm();
    });
  }

  buildForm() {
    this.editForm = new FormGroup({
      headerTitle: new FormControl(this.showCase.headerTitle, Validators.required),
      headerSubtitle: new FormControl(this.showCase.headerSubtitle, Validators.required),
      trophySection: new FormControl(this.showCase.trophySection, Validators.required),
      goalSection: new FormControl(this.showCase.goalSection, Validators.required),
      TOECSection: new FormControl(this.showCase.TOECSection, Validators.required),
      trophyPage: new FormControl(this.showCase.trophyPage, Validators.required),
      clubSignUp: new FormControl(this.showCase.clubSignUp, Validators.required),
      userLogIn: new FormControl(this.showCase.userLogIn, Validators.required),
      rules: new FormControl(this.showCase.rules),
      fbUrl: new FormControl(this.showCase.fbUrl),
      ytbUrl: new FormControl(this.showCase.ytbUrl),
      linkedInUrl: new FormControl(this.showCase.linkedInUrl),
      igUrl: new FormControl(this.showCase.igUrl),
      phoneNumber: new FormControl(this.showCase.phoneNumber, Validators.required),
      emailAddress: new FormControl(this.showCase.emailAddress, Validators.required),
      addressLine: new FormControl(this.showCase.addressLine, Validators.required),
      postalCode: new FormControl(this.showCase.postalCode, Validators.required),
      city: new FormControl(this.showCase.city, Validators.required)
    })
  }

  onSaveShowcase() {
    if (!this.editForm.valid) {
      return;
    }

    this.loading = true;
    this.apiService.updateShowCase(this.editForm.value)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((showCase: Showcase) => {
        this.editForm.markAsUntouched();
        this.toastrService.success('Contenu mis à jour !');
      })
  }
}
