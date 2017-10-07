import { Component,  HostListener, OnInit } from '@angular/core';

import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';

import {ColorAnimateService} from './color-animate.service';

@Component({
  template: `<div style="overflow: hidden" [@listColorChange]="listColor"></div>`,
  animations: [
    trigger('listColorChange', [
      state('void', style({color: 'red'})),
      state('in', style({color: 'black'})),
      state('out', style({opacity: 0.5})),
      transition(':enter', [
        animate('1200ms ease', keyframes([
          style({color: 'red', offset: 0}),
          style({color: 'black', offset: .5})
        ])),
      transition('in => out', [
        animate('1200ms', style({opacity: 0.5}))
      ])
    ])
  ])]
})
export class ColorAnimateComponent implements OnInit {
  public listColor = 'in';
  public elementId = -1;

  constructor(private colorAnimateService: ColorAnimateService) { }

  public ngOnInit() {
    this.colorAnimateService.ListNotifier.subscribe((fade: number) => {
      if(this.elementId !== fade) {
        setTimeout( () => {fade % this.elementId === 0 ? this.listColor = 'out' : this.listColor = 'in'}, 0);
      }
    });
  }
}
