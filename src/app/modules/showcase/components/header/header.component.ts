import { Component, Input } from '@angular/core';
import { Partner } from 'src/app/models/partner.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()
  heading?: string;

  @Input()
  partners?: Partner[];

  @Input()
  apiUrl: string;

  @Input()
  subheading?: string;
}
