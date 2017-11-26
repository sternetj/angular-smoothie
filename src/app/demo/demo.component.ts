import { Component, Input, Type } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent {
  @Input() public animation: string | Type<any>;
  public testList = [1];

  public addListItem() {
    this.testList.push((this.testList[this.testList.length - 1] || 0) + 1);
  }
}
