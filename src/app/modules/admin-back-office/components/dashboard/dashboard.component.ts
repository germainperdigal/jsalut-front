import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Club count */
  clubCount: number;

  /** Juror count */
  jurorCount: number;

  /** Editions count */
  editionsCount: number;

  constructor(
    private readonly route: ActivatedRoute
  ) {
    this.route.data.subscribe(({users, editions}) => {
      this.clubCount = users.filter((user: User) => user.role === 'CLUB').length;
      this.jurorCount = users.filter((user: User) => user.role === 'JUROR').length;
      this.editionsCount = editions.length;
    });
  }
}
