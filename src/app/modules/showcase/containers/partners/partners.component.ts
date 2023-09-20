import { Component } from '@angular/core';
import { Showcase } from 'src/app/models/showcase.model';
import { ActivatedRoute } from '@angular/router';
import { Partner } from 'src/app/models/partner.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent {
  /** Partners */
  partners: Array<Partner>;

  /** Api URL */
  apiUrl = this.apiService.apiUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    // @ts-ignore
    this.activatedRoute.data.subscribe(({partners}) => {
      this.partners = partners;
    });
  }
}
