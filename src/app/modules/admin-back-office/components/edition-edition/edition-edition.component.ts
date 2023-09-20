import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edition-edition',
  templateUrl: './edition-edition.component.html',
  styleUrls: ['./edition-edition.component.scss']
})
export class EditionEditionComponent {
  /** Edition */
  edition: any;

  /** Edition form */
  editionForm: FormGroup;

  /** Loading */
  loading: boolean;

  /** Pics */
  pics = [];

  /** Pics input */
  picsInput = [1];

  /** Already uploaded pics */
  alreadyUploadedPics: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly toastrService: ToastrService,
  ) {
    this.route.data.subscribe(({edition, files}) => {
      // @ts-ignore
      this.edition = edition;
      this.buildForm();
      // @ts-ignore
      this.alreadyUploadedPics = files;
    });
  }

  buildForm() {
    this.editionForm = new FormGroup({
      year: new FormControl(this.edition.year, Validators.required),
      winner: new FormControl(this.edition.winner),
      winnerDescription: new FormControl(this.edition.winnerDescription),
      applicationEndsAt: new FormControl(this.edition.applicationEndsAt, Validators.required),
      isActive: new FormControl(this.edition.isActive),
      eventContent: new FormControl(this.edition.eventContent),
      video: new FormControl(this.edition.video),
      isVisible: new FormControl(this.edition.isVisible),
    });
  }

  /** Add input file */
  addInputFile() {
    const index = this.picsInput.length;
    this.picsInput.push(index+1);
  }

  handleFile(event: Event, index: number) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    // @ts-ignore
    this.pics[index-1] = files[0];
  }

  /** On edit */
  onEdit() {
    this.loading = true;

    this.apiService.updateEdition(this.edition._id, this.edition.year, this.editionForm.value, this.pics)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(() => {
        this.toastrService.success('Édition mis à jour !')
      })
  }
}
