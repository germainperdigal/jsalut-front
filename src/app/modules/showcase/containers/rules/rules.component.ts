import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Showcase } from 'src/app/models/showcase.model';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent {
  /** Show case */
  showCase: Showcase;

  constructor(
    private readonly route: ActivatedRoute
  ) {
    this.route.parent?.data.subscribe(({showCase}) => {
      this.showCase = showCase;
    });
  }
}
