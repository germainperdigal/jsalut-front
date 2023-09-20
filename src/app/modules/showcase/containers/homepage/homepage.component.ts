import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Showcase } from 'src/app/models/showcase.model';
import { interval, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  /** Show case */
  showCase: Showcase;
  /** Gallery */
  gallery: Array<any>;

  /** Diff */
  _diff: number;

  /** Days */
  _days: number;

  /** Hours */
  _hours: number;

  /** Application ends at */
  applicationEndsAt: string;

  /** Minutes */
  _minutes: number;

  /** Seconds */
  _seconds: number;

  private _album: Array<any> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private _lightbox: Lightbox
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({currentEdition, gallery}) => {
      this.applicationEndsAt = currentEdition?.applicationEndsAt;
      this.gallery = gallery;
      Object.values(gallery).forEach((file: any) => {
        this._album.push({
          src: this.buildPictureUrl(file),
          caption: `Trophée Jean Salut`,
          thumb: this.buildPictureUrl(file)
        });
      });
      interval(3000).pipe(
        map((x) => {this._diff = Date.parse(currentEdition?.applicationEndsAt) - Date.parse(new Date().toString());
        })).subscribe((x) => {
        this._days = this.getDays(this._diff);
        this._hours = this.getHours(this._diff);
        this._minutes = this.getMinutes(this._diff);
      });
    })

    // @ts-ignore
    this.activatedRoute.parent.data.subscribe((data: ({showCase: Showcase})) => {
      this.showCase = data.showCase;
    });
  }

  /** Build picture url */
  buildPictureUrl(fileName: string): String {
    const year = fileName.split('/')[1];
    const file = fileName.split('/')[2];

    return `${this.apiService.apiUrl}/editions-img/${year}/${file}`;
  }

  getDays(t: number) {
    return Math.floor( t / (1000 * 60 * 60 * 24) );
  }

  getHours(t: number) {
    return Math.floor( (t / (1000 * 60 * 60)) % 24 );
  }

  getMinutes(t: number) {
    return Math.floor( (t / 1000 / 60) % 60 );
  }

  open(index: number): void {
    this._lightbox.open(this._album, index);
  }

  close(): void {
    this._lightbox.close();
  }
}
