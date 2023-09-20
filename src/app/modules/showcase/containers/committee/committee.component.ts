import { Component } from '@angular/core';
import { Committe } from 'src/app/models/committe.model';
import { ActivatedRoute } from '@angular/router';
import { Showcase } from 'src/app/models/showcase.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.scss']
})
export class CommitteeComponent {
  /** Committee */
  committees: Committe[];

  /** Api URL */
  apiUrl = this.apiService.apiUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
  ) {
    // @ts-ignore
    this.activatedRoute.data.subscribe(({committees}) => {
      this.committees = committees.filter((committee: any) => committee.members?.length);
    });
  }
}
