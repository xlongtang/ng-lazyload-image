import { AfterContentInit, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
export interface IOnLoadedPayload {
    success: boolean;
    element: ElementRef;
}
export declare class LazyLoadImageDirective implements OnChanges, AfterContentInit, OnDestroy {
    lazyImage: any;
    defaultImage: string;
    errorImage: string;
    scrollTarget: any;
    scrollObservable: any;
    offset: number;
    useSrcset: boolean;
    onLoad: EventEmitter<IOnLoadedPayload>;
    private propertyChanges$;
    private elementRef;
    private ngZone;
    private scrollSubscription;
    constructor(el: ElementRef, ngZone: NgZone);
    ngOnChanges(changes?: SimpleChanges): void;
    ngAfterContentInit(): any;
    ngOnDestroy(): void;
}
