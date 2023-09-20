import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partner } from 'src/app/models/partner.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent {
  /** Partner */
  partner: Partner;

  /** API Url */
  apiUrl = this.apiService.apiUrl;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
  ) {
    this.route.data.subscribe(({partner}) => {
      this.partner = partner;
    })
  }
}
