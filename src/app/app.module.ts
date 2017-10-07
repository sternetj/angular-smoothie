import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ColorAnimateComponent } from './animators/color-animate.component';
import { NgForAnimator } from './ngForAnimator';
import { ListStateService } from './list-state.service';
import { ColorAnimateService } from './animators/color-animate.service';

@NgModule({
  declarations: [
    AppComponent,
    NgForAnimator,
    ColorAnimateComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule
  ],
  entryComponents: [ ColorAnimateComponent ],
  providers: [ListStateService, ColorAnimateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
