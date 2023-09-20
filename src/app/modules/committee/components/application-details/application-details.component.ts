import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, of, switchMap, zip } from 'rxjs';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent {
  /** Application */
  application: any;

  /** User */
  user: User;

  /** Api url */
  apiUrl = this.apiService.apiUrl;

  /** Loading download */
  loadingDownload: boolean;

  /** User note */
  get userNote(): number {
    return this.application.notes.find((note: any) => note.user === this.user._id)?.note;
  }

  get invalidApplication(): boolean {
    return !this.application.video || !this.application.arePicsUploaded || !this.application.isResumeUploaded;
  }

  get applicationAverage(): number {
    if (!this.application.notes.length) {
      return 0;
    }

    const notes = this.application.notes.map((note: any) => note.note);
    const sum = notes.reduce((accumulator: any, currentValue: any) => {
      return accumulator + currentValue;
    }, 0);

    return sum / notes.length;
  }

  constructor(
    private route: ActivatedRoute,
    private readonly toastrService: ToastrService,
    private readonly apiService: ApiService,
  ) {
    this.route.data.subscribe(({application}) => this.application = application);
    this.route.parent?.data.subscribe(({user}) => this.user = user);
  }

  noteApplication(event: { value: number }) {
    this.apiService.noteApplication(this.application._id, { user: this.user._id, note: event.value })
      .subscribe((updatedApplication: any) => {
        this.application = updatedApplication;
        this.toastrService.success('La note a bien été pris en compte !', 'C\'est noté !', {positionClass: 'toast-bottom-right'});
      });
  }

  /** View file */
  viewFile(file: string) {
    if (file === 'sportCv') {
      window.open(`${this.apiService.apiUrl}/applications/${this.application.edition.year}/${this.application.user._id}/sportCv.pdf`);
    } else {
      const extensions = ['.zip', '.rar'];
      zip(
        this.apiService.getFile(this.application.edition.year, this.application.user._id, 'pics.rar').pipe(catchError(() => of(null))),
        this.apiService.getFile(this.application.edition.year, this.application.user._id, 'pics.zip').pipe(catchError(() => of(null)))
      )
        .pipe(
          switchMap((array) => array[0] ? of(array[0]) : of(array[1]))
        )
        .subscribe((file: any) => {
          window.open(file.url);
        })
    }
  }

  downloadApplication() {
    this.loadingDownload = true;

    this.apiService.downloadApplication(this.application._id)
      .pipe(
        finalize(() => this.loadingDownload = false)
      )
      .subscribe((response) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob([response.body], { type: response.body.type }));

        const contentDisposition = response.headers.get('content-disposition');
        const fileName = `${this.application.firstNamePlayer }-${this.application.lastNamePlayer.toUpperCase()}.zip`;
        downloadLink.download = fileName;
        downloadLink.click();
      })
  }
}
