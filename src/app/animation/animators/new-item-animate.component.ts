import { Component,  HostListener, OnInit } from '@angular/core';

import {trigger, state, style, transition, animate, keyframes, query} from '@angular/animations';

import {ColorAnimateService} from './color-animate.service';
import { Animator } from '../animator';

@Component({
  template: `<div [@listColorChange]="listColor"></div>`,
  styles: [`
    :host {
      overflow: hidden;
      display: block;
    }
  `],
  animations: [
    trigger('listColorChange', [
      state('in', style({color: 'black'})),
      transition('* => in', [
        style({height: '0px', transform: 'translateX(100%)'}),
        query(':first-child', [
          animate('0ms', style({height: '0'})),
          animate('300ms', style({height: '*'})),
        ]),
        animate('800ms', style({transform: 'translateX(0)'})),
      ]),
      transition(':leave', [
        style({transform: 'translateX(0)', height: '*'}),
        animate('800ms', style({transform: 'translateX(100%)'})),
        query(':first-child', [
          animate('0s', style({height: '*'})),
          animate('300ms', style({height: '0'})),
        ]),
      ])
  ])]
})
export class NewItemAnimateComponent implements OnInit, Animator {
  public listColor = 'in';
  public elementId = -1;

  constructor(private colorAnimateService: ColorAnimateService) { }

  public ngOnInit() {
    this.colorAnimateService.ListNotifier.subscribe((fade: number) => {
      if(this.elementId === fade) {
      }
    });

    this.colorAnimateService.LeaveNotifier.subscribe((leaving) => {
      if(this.elementId === leaving) {
        this.listColor = 'leave';
        setTimeout( () => {
          setTimeout( () => {
            this.listColor = 'in'
          }, 1000);
        }, 0);
      }
    })
  }

  public elementAddedAfter(added: number, current: number) {
    console.log(`element ${added} added after ${current}`)
  }

  public elementAddedBefore(added: number, current: number) {
    console.log(`element ${added} added before ${current}`);
  }

  public elementRemovedBefore(removed: number, current: number) {
    console.log(`element ${removed} removed before ${current}`)
  }

  public elementRemvoedAfter(removed: number, current: number) {
    console.log(`element ${removed} removed after ${current}`)
  }
}
