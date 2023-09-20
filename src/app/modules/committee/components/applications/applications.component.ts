import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {
  /** Current edition */
  currentEdition: any;

  /** Displayed applications */
  displayedApplications: Array<any>;

  /** Applications */
  applications: Array<any>;

  /** Loading download */
  loadingDownload: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
  ) {
    // @ts-ignore
    this.route.parent.data.subscribe(({currentEdition, currentApplications}) => {
      this.currentEdition = currentEdition;
      this.displayedApplications = currentApplications;
      this.applications = currentApplications;
    })
  }

  getApplicationAverage(application: any) {
    if (!application.notes.length) {
      return 0;
    }

    const notes = application.notes.map((note: any) => note.note);
    const sum = notes.reduce((accumulator: any, currentValue: any) => {
      return accumulator + currentValue;
    }, 0);

    return sum / notes.length;
  }

  filterApplications(event: { checked: boolean }) {
    if (event.checked) {
      this.displayedApplications = this.applications.filter((e) => e.isResumeUploaded && e.arePicsUploaded && e.video);
    } else {
      this.displayedApplications = this.applications;
    }
  }

  downloadAll() {
    this.loadingDownload = true;

    this.apiService.downloadApplications(this.currentEdition._id)
      .pipe(
        finalize(() => this.loadingDownload = false)
      )
      .subscribe((response) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob([response.body], { type: response.body.type }));

        const contentDisposition = response.headers.get('content-disposition');
        const fileName = 'zip.zip';
        downloadLink.download = fileName;
        downloadLink.click();
      })
  }

  getApplicationStatus(application: any) {
    if (!application.isResumeUploaded || !application.arePicsUploaded || !application.video) {
      return ['Incomplète', 'red'];
    }

    return ['Complète', 'yellow'];
  }
}
