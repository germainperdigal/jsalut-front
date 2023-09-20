import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  /** Gallery */
  gallery: Array<any>;

  private _album: Array<any> = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private _lightbox: Lightbox
  ) {
    this.route.parent?.data.subscribe(({gallery}) => {
      this.gallery = Object.values(gallery).sort(() => (Math.random() > 0.5) ? 1 : -1);
      this.gallery.forEach((file: any, index: number) => {
        this._album.push({
          src: this.buildPictureUrl(file),
          caption: 'Trophée Jean Salut - ' + (index+1),
          thumb: this.buildPictureUrl(file)
        });
      })
    })
  }

  /** Build picture url */
  buildPictureUrl(fileName: string): String {
    const year = fileName.split('/')[1];
    const file = fileName.split('/')[2];

    return `${this.apiService.apiUrl}/editions-img/${year}/${file}`;
  }

  open(index: number): void {
    this._lightbox.open(this._album, index);
  }

  close(): void {
    this._lightbox.close();
  }
}
