import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Showcase } from 'src/app/models/showcase.model';

@Component({
  selector: 'app-trophy',
  templateUrl: './trophy.component.html',
  styleUrls: ['./trophy.component.scss']
})
export class TrophyComponent {
  /** Show case */
  showCase: Showcase;

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
    // @ts-ignore
    this.activatedRoute.parent.data.subscribe(({showCase}) => {
      this.showCase = showCase;
    });
  }
}
