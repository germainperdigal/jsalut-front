import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editions',
  templateUrl: './editions.component.html',
  styleUrls: ['./editions.component.scss']
})
export class EditionsComponent {
  /** Editions */
  editions: Array<any>;
  displayedEditions: Array<any>;

  displayedColumns: string[] = ['year', 'applicationEndsAt', 'isActive', 'isVisible'];

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe(({editions}) => {
      this.editions = editions;
      this.displayedEditions = this.editions
    });
  }

  /** Filter editions */
  filterEditions(event: { checked: boolean }) {
    if (event.checked) {
      this.displayedEditions = this.editions.filter((e) => e.isActive);
    } else {
      this.displayedEditions = this.editions;
    }
  }
}
