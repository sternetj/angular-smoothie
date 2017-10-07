import { Component,  HostListener, OnInit } from '@angular/core';

import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';

import {ColorAnimateService} from './color-animate.service';

@Component({
  template: `<div [@listColorChange]="listColor"></div>`,
  animations: [
    trigger('listColorChange', [
      state('void', style({color: 'red'})),
      state('in', style({color: 'black'})),
      state('out', style({color: 'red'})),
      transition('in => out', [
        style({ color: 'black' }),
        animate('1200ms', style({color: 'blue'})),
        animate('1200ms', style({color: 'red'})),
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
