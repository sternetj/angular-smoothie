import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ColorAnimateComponent } from './animators/color-animate.component';
import { NgForAnimator } from './ngForAnimator';
import { ListStateService } from './list-state.service';
import { ColorAnimateService } from './animators/color-animate.service';
import { NewItemAnimateComponent } from './animators/new-item-animate.component';

@NgModule({
  declarations: [
    NgForAnimator,
    ColorAnimateComponent,
    NewItemAnimateComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule
  ],
  exports: [
    NgForAnimator,
  ],
  entryComponents: [ ColorAnimateComponent, NewItemAnimateComponent ],
  providers: [ListStateService, ColorAnimateService]
})
export class AnimationModule { }
