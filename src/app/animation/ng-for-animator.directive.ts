import {
  Directive, ElementRef, ViewChildren, HostListener, ViewContainerRef,
  ComponentFactoryResolver, Input, Type, OnChanges, OnDestroy, AfterViewInit, Inject, forwardRef, ComponentRef
} from '@angular/core';

import * as Animators from './animators';

import { ColorAnimateService } from "./animators";
import { Animator } from './animator';

@Directive({ selector: '[ngForAnimator]' })
export class NgForAnimator implements OnChanges, AfterViewInit, OnDestroy {
  idObj: { instance: any; ngForId: any; elementId: any; };

  @Input('ngForAnimator') private animator: string | Type<any> = Animators.ColorAnimateComponent;
  @Input() elementId: number = Math.random();
  @Input() ngFor: Array<any> | Iterable<any>;
  private cRef: ComponentRef<Animator>;

  constructor(private _viewContainer: ViewContainerRef,
    private _elRef: ElementRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private colorAnimateService: ColorAnimateService) { }

  public ngOnChanges() {
    if (!this.cRef) {
      const animationComponent = this.getAnimationComponent();
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(animationComponent);
      this.colorAnimateService.ListNotifier.next(++this.elementId);
      this.cRef = this._viewContainer.createComponent(componentFactory);
      this.cRef.instance.elementId = this.elementId;

      this.idObj = this.getIdObject(this.cRef);
      this.idObj.instance = this.cRef.instance;
      this.idObj.ngForId = (this._elRef.nativeElement as Element).parentElement.getAttribute('ng-for-animator-id') || this.getNewNgForId();
      (this._elRef.nativeElement as Element).parentElement.setAttribute('ng-for-animator-id', this.idObj.ngForId)

      if (!this.colorAnimateService.animators[this.idObj.ngForId]) {
        this.colorAnimateService.animators[this.idObj.ngForId] = [];
      }

      this.colorAnimateService.animators[this.idObj.ngForId].push(this.idObj);
      this.colorAnimateService.animators[this.idObj.ngForId]
        .sort((objA: any, objB: any) => objA.elementId - objB.elementId)
        .forEach((obj: any, index: number, arr: object[]) => {
          let currentIndex = arr.indexOf(this.idObj);
          if (currentIndex != index) {
            if (currentIndex > index) {
              obj.instance.elementAddedAfter && obj.instance.elementAddedAfter(arr.indexOf(this.idObj), index);
            } else {
              obj.instance.elementAddedBefore && obj.instance.elementAddedBefore(arr.indexOf(this.idObj), index);
            }
          }
        });
    }
  }

  public ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.colorAnimateService.LeaveNotifier.next(this.elementId);
    this.colorAnimateService.animators[this.idObj.ngForId]
      .sort((objA: any, objB: any) => objA.elementId - objB.elementId)
      .forEach((obj: any, index: number, arr: object[]) => {
        let currentIndex = arr.indexOf(this.idObj);
        if (currentIndex != index) {
          if (currentIndex > index) {
            obj.instance.elementRemvoedAfter && obj.instance.elementRemvoedAfter(arr.indexOf(this.idObj), index);
          } else {
            obj.instance.elementRemovedBefore && obj.instance.elementRemovedBefore(arr.indexOf(this.idObj), index);
          }
        }
      });

      this.colorAnimateService.animators[this.idObj.ngForId].splice(this.colorAnimateService.animators[this.idObj.ngForId].indexOf(this.idObj, 1))
  }

  public ngAfterViewInit() {
    //this.cRef.hostView.rootNodes[0].childNodes[0].classList = this._elRef.nativeElement.classList;
    (this.cRef.hostView as any).rootNodes[0].childNodes[0].appendChild(this._elRef.nativeElement);
  }

  private getAnimationComponent(): Type<any> {
    let animationComponent = this.animator as Type<any>;
    if (typeof (this.animator) === 'string') {
      switch (this.animator) {
        default:
          animationComponent = Animators.ColorAnimateComponent;
      }
    }

    return animationComponent;
  }

  private getIdObject(cRef: ComponentRef<any>) {
    let res = { instance: undefined, ngForId: undefined, elementId: undefined };
    this.cRef.location.nativeElement.classList.forEach((c) => {
      let test = c.match(/ng-tns-c(\d+)-(\d+)/);
      if (test) {
        res = {
          ...res,
          ngForId: +test[1],
          elementId: +test[2],
        }
      }
    });

    return res;
  }

  private getNewNgForId() {
    return Math.floor(Math.random() * 100000).toString();
  }
}
