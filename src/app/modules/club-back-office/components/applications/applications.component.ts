import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {
  /** Applications */
  applications: any;

  constructor(
    private readonly route: ActivatedRoute
  ) {
    this.route.data.subscribe(({applications}) => {
      this.applications = applications;
    })
  }

  getApplicationStatus(application: any) {
    if (!application.isResumeUploaded || !application.arePicsUploaded || !application.video) {
      return ['Incomplète', 'red'];
    }

    return ['Complète', 'yellow'];
  }
}
