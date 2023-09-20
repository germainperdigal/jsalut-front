import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  /** Messages */
  messages: Array<any>;

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe(({messages}) => {
      this.messages = messages;
    });
  }
}
