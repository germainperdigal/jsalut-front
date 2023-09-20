import { Component, Input } from '@angular/core';
import { Showcase } from 'src/app/models/showcase.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  /** Display socials */
  @Input()
  displaySocials: boolean = true;

  @Input()
  showCase: Showcase;
}
