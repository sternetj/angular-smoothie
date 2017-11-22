import {Directive, ElementRef, ViewChildren, HostListener, ViewContainerRef,
        ComponentFactoryResolver, Input, Type, OnChanges, OnDestroy, AfterViewInit } from '@angular/core';

import * as Animators from './animators';

import {ColorAnimateService} from "./animators";

@Directive({ selector: '[ngForAnimator]' })
export class NgForAnimator implements OnChanges, AfterViewInit, OnDestroy {

    @Input('ngForAnimator') private animator: string | Type<any> = Animators.ColorAnimateComponent;
    @Input() elementId: number = 0;
    private cRef;

    constructor(private _viewContainer: ViewContainerRef,
      private _elRef: ElementRef,
      private _componentFactoryResolver: ComponentFactoryResolver,
      private colorAnimateService: ColorAnimateService) {}

    public ngOnChanges(){
      if(!this.cRef){
        const animationComponent = this.getAnimationComponent();
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(animationComponent);
        this.colorAnimateService.ListNotifier.next(++this.elementId);
        this.cRef = this._viewContainer.createComponent(componentFactory);
        this.cRef.instance.elementId = this.elementId;
      }
    }

    public ngOnDestroy() {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.colorAnimateService.LeaveNotifier.next(this.elementId);
    }

    public ngAfterViewInit(){
      //this.cRef.hostView.rootNodes[0].childNodes[0].classList = this._elRef.nativeElement.classList;
      this.cRef.hostView.rootNodes[0].childNodes[0].appendChild(this._elRef.nativeElement);
    }

    private getAnimationComponent(): Type<any> {
      let animationComponent = this.animator as Type<any>;
      if (typeof(this.animator) === 'string') {
        switch (this.animator) {
          default:
            animationComponent = Animators.ColorAnimateComponent;
        }
      }

      return animationComponent;
    }
}
