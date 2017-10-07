import { Injectable } from '@angular/core';

import {Subject} from 'rxjs/Subject';

@Injectable()
export class ColorAnimateService {
  public ListNotifier: Subject<number> = new Subject<number>();
}
