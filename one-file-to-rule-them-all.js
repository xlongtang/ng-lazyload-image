webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(26);
	__webpack_require__(281);
	__webpack_require__(282);
	var browser_1 = __webpack_require__(283);
	var app_component_1 = __webpack_require__(483);
	browser_1.bootstrap(app_component_1.AppComponent);


/***/ },

/***/ 483:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(304);
	var image_component_1 = __webpack_require__(484);
	var AppComponent = (function () {
	    function AppComponent() {
	        this.images = [
	            'https://images.unsplash.com/photo-1431887773042-803ed52bed26?fm=jpg',
	            'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg',
	            'https://images.unsplash.com/photo-1448960968772-b63b3f40dfc1?fm=jpg',
	            'https://images.unsplash.com/photo-1432256851563-20155d0b7a39?fm=jpg'
	        ];
	    }
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: 'my-app',
	            template: "\n        <image *ngFor=\"#image of images\" [src]=\"image\"></image>\n    ",
	            directives: [image_component_1.ImageComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppComponent);
	    return AppComponent;
	})();
	exports.AppComponent = AppComponent;


/***/ },

/***/ 484:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(304);
	var lazy_load_image_directive_1 = __webpack_require__(485);
	var ImageComponent = (function () {
	    function ImageComponent() {
	    }
	    __decorate([
	        core_1.Input('src'), 
	        __metadata('design:type', Object)
	    ], ImageComponent.prototype, "image", void 0);
	    ImageComponent = __decorate([
	        core_1.Component({
	            selector: 'image',
	            styles: ["\n        img {\n            width: 100%;\n            min-height: 1000px;\n            transition: opacity 1s;\n            opacity: 0;\n        }\n\n        img.ng2-lazyloaded {\n            opacity: 1;\n        }\n    "],
	            template: "\n        <img src=\"https://www.placecage.com/1000/1000\" [lazyLoad]=\"image\" offset=\"0\">\n    ",
	            directives: [lazy_load_image_directive_1.LazyLoadImageDirective]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ImageComponent);
	    return ImageComponent;
	})();
	exports.ImageComponent = ImageComponent;


/***/ },

/***/ 485:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(304);
	var rxjs_1 = __webpack_require__(26);
	var LazyLoadImageDirective = (function () {
	    function LazyLoadImageDirective(el) {
	        this.viewportSize = {
	            height: 0,
	            width: 0
	        };
	        this.elementRef = el;
	    }
	    LazyLoadImageDirective.prototype.ngAfterContentInit = function () {
	        var _this = this;
	        this.updateViewportOffset();
	        this.scrollSubscription = rxjs_1.Observable
	            .merge(rxjs_1.Observable.of(1), rxjs_1.Observable.fromEvent(window, 'scroll'))
	            .sampleTime(100)
	            .filter(function () { return _this.isVisible(); })
	            .switchMap(function () { return _this.loadImage(_this.lazyImage); })
	            .map(function () { return _this.setImage(_this.lazyImage); })
	            .finally(function () { return _this.setLoadedStyle(); })
	            .subscribe(function () { return _this.ngOnDestroy(); }, function (error) {
	            _this.setImage(_this.defaultImg);
	            _this.ngOnDestroy();
	        });
	    };
	    LazyLoadImageDirective.prototype.loadImage = function (image) {
	        return rxjs_1.Observable
	            .create(function (observer) {
	            var img = new Image();
	            img.src = image;
	            img.onload = function () {
	                observer.next(img);
	                observer.complete();
	            };
	            img.onerror = function (err) {
	                observer.error(err);
	                observer.complete();
	            };
	        });
	    };
	    LazyLoadImageDirective.prototype.setImage = function (image) {
	        this.elementRef.nativeElement.src = image;
	    };
	    LazyLoadImageDirective.prototype.setLoadedStyle = function () {
	        var styles = this.elementRef.nativeElement.className
	            .split(' ')
	            .filter(function (s) { return !!s; })
	            .filter(function (s) { return s !== 'ng2-lazyloading'; });
	        styles.push('ng2-lazyloaded');
	        this.elementRef.nativeElement.className = styles;
	    };
	    LazyLoadImageDirective.prototype.isVisible = function () {
	        var rect = this.elementRef.nativeElement.getBoundingClientRect();
	        return (rect.top >= 0 &&
	            rect.left >= 0 &&
	            (rect.bottom - rect.height) <= this.viewportSize.height &&
	            (rect.right - rect.width) <= this.viewportSize.width);
	    };
	    LazyLoadImageDirective.prototype.updateViewportOffset = function () {
	        this.viewportSize.height = (window.innerHeight || document.documentElement.clientHeight) + (this.offset | 0);
	        this.viewportSize.width = (window.innerWidth || document.documentElement.clientWidth) + (this.offset | 0);
	    };
	    LazyLoadImageDirective.prototype.ngOnDestroy = function () {
	        [this.scrollSubscription]
	            .filter(function (subscription) { return subscription && !subscription.isUnsubscribed; })
	            .forEach(function (subscription) { return subscription.unsubscribe(); });
	    };
	    __decorate([
	        core_1.Input('lazyLoad'), 
	        __metadata('design:type', Object)
	    ], LazyLoadImageDirective.prototype, "lazyImage", void 0);
	    __decorate([
	        core_1.Input('src'), 
	        __metadata('design:type', Object)
	    ], LazyLoadImageDirective.prototype, "defaultImg", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], LazyLoadImageDirective.prototype, "offset", void 0);
	    LazyLoadImageDirective = __decorate([
	        core_1.Directive({
	            selector: '[lazyLoad]'
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], LazyLoadImageDirective);
	    return LazyLoadImageDirective;
	})();
	exports.LazyLoadImageDirective = LazyLoadImageDirective;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = LazyLoadImageDirective;


/***/ }

});
//# sourceMappingURL=one-file-to-rule-them-all.js.map