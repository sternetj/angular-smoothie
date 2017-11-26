import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnimationModule } from './animation/animation.module';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AnimationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
