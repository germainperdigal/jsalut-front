import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity:0, transform: 'translate3d(0,-10px,0)'}),
        animate(200, style({opacity:1, transform: 'translate3d(0,0,0)'}))
      ]),
      transition(':leave', [
        animate(100, style({opacity:0, transform: 'translate3d(0,10px,0)'}))
      ])
    ])
  ]
})
export class MenuComponent {
  /** Mobile menu */
  mobileMenu: boolean;

  /** Nav links */
  navLinks = [
    {
      path: '/',
      label: 'Le trophée'
    },
    {
      path: '/editions',
      label: 'Les éditions'
    },
    {
      path: '/reglement',
      label: 'Règlement'
    },
    {
      path: '/comite',
      label: 'Comité de sélection'
    },
    {
      path: '/partenaires',
      label: 'Les partenaires'
    },
    {
      path: '/nous-contacter',
      label: 'Nous contacter'
    }
  ];

  get currentRoute(): string {
    return this.router.url;
  }

  constructor(
    private readonly router: Router
  ) {
  }
}
