import { Component } from '@angular/core';
import { Partner } from 'src/app/models/partner.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent {
  /** Partners */
  partners: Array<Partner>;

  /** Loading */
  loading: boolean;

  /** Delete loading */
  deleteLoading: boolean;

  /** File */
  file: File;

  /** Small file */
  smallFile: File;

  /** Partner form */
  partnerForm = new FormGroup({
    _id: new FormControl(null),
    label: new FormControl(null, Validators.required),
    shortDescription: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    website: new FormControl(null),
    isActive: new FormControl(true)
  })

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly toastrService: ToastrService,
  ) {
    this.route.data.subscribe(({partners}) => {
      this.partners = partners;
    })
  }

  handleFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    // @ts-ignore
    this.file = files[0];
  }

  handleSmallFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    // @ts-ignore
    this.smallFile = files[0];
  }

  /** Create partner */
  createPartner() {
    this.loading = true;

    // @ts-ignore
    this.apiService.createPartner(this.partnerForm.value, this.file, this.smallFile)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((partner: Partner) => {
        this.partners.push(partner);
        this.toastrService.success('Partenaire créé !');
        this.partnerForm.reset();
      });
  }

  deletePartner(partner: Partner) {
    this.deleteLoading = true;

    this.apiService.deletePartner(partner)
      .pipe(
        finalize(() => {
          this.deleteLoading = false
        })
      )
      .subscribe(() => {
        this.partners = this.partners.filter((_partner: Partner) => _partner._id !== partner._id)
        this.toastrService.success('Partenaire supprimé !')
      });
  }
}
