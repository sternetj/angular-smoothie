import { Component } from '@angular/core';

import {ListStateService} from './animation/list-state.service';

import * as Animators from './animation/animators';
import { trigger, transition, query, animateChild } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('ngEnterLeaveAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ])
  ]
})
export class AppComponent {
  public animators = Animators;
  public testList: number[] = [1];

  private counter = 2;

  constructor(private _listStateService: ListStateService) {}

  public addListItem() {
    this.testList.push(this.counter++);
  }

  public modifyListItem() {
    const index = Math.floor(Math.random() * this.testList.length);
    this.testList[index]++;
  }

  public changeAnimationColor(color: string) {
    this._listStateService.listChangeColor = color;
  }
}
