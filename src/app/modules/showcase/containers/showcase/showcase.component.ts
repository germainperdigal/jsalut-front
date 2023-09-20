import { Component, OnInit } from '@angular/core';
import { Showcase } from 'src/app/models/showcase.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Partner } from 'src/app/models/partner.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {
  /** Show case */
  showCase: Showcase;

  /** Partners */
  partners: Partner[];

  get hideSocial(): boolean {
    return this.router.url === '/';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public apiService: ApiService
  ) {
  }

  ngOnInit() {
    // @ts-ignore
    this.activatedRoute.data.subscribe((data: ({showCase: Showcase, partners: Partner[]})) => {
      this.partners = data.partners.filter((partner: Partner) => partner.smallFileName);
      this.showCase = data.showCase;
    });
  }
}
