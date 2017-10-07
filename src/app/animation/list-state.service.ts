import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class ListStateService {
  public listStateChangedEmitter = new EventEmitter<boolean>();
  public listChangeColor = 'off';

  public invertColor() {
    this.listChangeColor === 'off' ? this.listChangeColor = 'on' : this.listChangeColor = 'off';
  }

  public getInvertColor() {
    return this.listChangeColor = 'off' ? 'on' : 'off';
  }
}
