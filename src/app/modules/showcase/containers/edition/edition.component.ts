import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent {
  /** Editions */
  editions: Array<any>;

  /** Displayed edition */
  displayedEdition: any;

  private _album: Array<any> = [];

  get videoLink() {
    const link = 'https://www.youtube.com/embed/' + this.displayedEdition.video.split('?v=')[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  get otherYears(): Array<any> {
    return this.editions.filter((e) => e.year !== this.displayedEdition.year).reverse();
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private _lightbox: Lightbox
  ) {
    // @ts-ignore
    this.activatedRoute.data.subscribe(({editions}) => {
      this.editions = editions;
      this.displayedEdition = editions[0];
      this.buildAlbum();
    });
  }

  open(index: number): void {
    this._lightbox.open(this._album, index);
  }

  close(): void {
    this._lightbox.close();
  }

  /** Build picture url */
  buildPictureUrl(fileName: string): String {
    return `${this.apiService.apiUrl}/editions-img/${this.displayedEdition.year}/${fileName}`;
  }

  buildAlbum() {
    this._album = [];
    this.displayedEdition.files?.forEach((file: any) => {
      this._album.push({
        src: this.buildPictureUrl(file),
        caption: `Édition ${this.displayedEdition.year}`,
        thumb: this.buildPictureUrl(file)
      });
    });
  }

  /**
   * Display edition
   *
   * @param edition The edition to display
   */
  displayEdition(edition: any) {
    this.displayedEdition = edition;
  }
}
