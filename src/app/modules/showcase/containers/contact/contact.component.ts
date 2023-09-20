import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Showcase } from 'src/app/models/showcase.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  /** Showcase */
  showCase: Showcase;

  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    // @ts-ignore
    this.activatedRoute.parent.data.subscribe((data: { showCase: Showcase }) => {
      this.showCase = data.showCase;
    });
  }

  /**
   * Form control has error
   * @param formControlName The form control name
   */
  formControlHasError(formControlName: string) {
    return this.contactForm.get(formControlName)?.hasError('required');
  }
}
