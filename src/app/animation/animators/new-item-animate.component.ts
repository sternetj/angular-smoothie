import { Component,  HostListener, OnInit } from '@angular/core';

import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';

import {ColorAnimateService} from './color-animate.service';

@Component({
  template: `<div [@listColorChange]="listColor"></div>`,
  styles: [`
    :host {
      overflow-x: hidden;
      display: block;
    }
  `],
  animations: [
    trigger('listColorChange', [
      state('in', style({color: 'black'})),
      transition('* => in', [
        style({height: 0, transform: 'translateX(100%)'}),
        animate('500ms', style({height: '*'})),
        animate('1000ms', style({transform: 'translateX(0)'})),
      ])
  ])]
})
export class NewItemAnimateComponent implements OnInit {
  public listColor = 'in';
  public elementId = -1;

  constructor(private colorAnimateService: ColorAnimateService) { }

  public ngOnInit() {
    this.colorAnimateService.ListNotifier.subscribe((fade: number) => {
      if(this.elementId === fade) {
        setTimeout( () => {this.listColor = 'in'}, 0);
      }
    });
  }
}
