"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/filter");
require("rxjs/add/operator/do");
require("rxjs/add/operator/take");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/of");
var Observable_1 = require("rxjs/Observable");
function isVisible(element, threshold, _window) {
    if (threshold === void 0) { threshold = 0; }
    if (_window === void 0) { _window = window; }
    var _a = element.getBoundingClientRect(), top = _a.top, bottom = _a.bottom, left = _a.left, right = _a.right;
    var height = _window.innerHeight;
    var width = _window.innerWidth;
    var elementLargerThenViewport = top <= -threshold && bottom >= (height + threshold) && left <= -threshold && right >= (width + threshold);
    var topInsideViewport = top <= (height + threshold) && top >= -threshold;
    var bottomInsideViewport = bottom >= -threshold && bottom <= (height + threshold);
    var rightsideInViewport = right >= -threshold && right <= (width + threshold);
    var leftsideInViewport = left <= (width + threshold) && left >= -threshold;
    return (elementLargerThenViewport ||
        ((topInsideViewport || bottomInsideViewport) &&
            (rightsideInViewport || leftsideInViewport)));
}
exports.isVisible = isVisible;
function loadImage(imagePath) {
    return Observable_1.Observable
        .create(function (observer) {
        var img = new Image();
        img.src = imagePath;
        img.onload = function () {
            observer.next(imagePath);
            observer.complete();
        };
        img.onerror = function (err) {
            observer.error(null);
        };
    });
}
function setImage(element, imagePath) {
    var isImgNode = element.nodeName.toLowerCase() === 'img';
    if (isImgNode) {
        element.src = imagePath;
    }
    else {
        element.style.backgroundImage = "url('" + imagePath + "')";
    }
    return element;
}
function setLoadedStyle(element) {
    var styles = element.className
        .split(' ')
        .filter(function (s) { return !!s; })
        .filter(function (s) { return s !== 'ng-lazyloading'; });
    styles.push('ng-lazyloaded');
    element.className = styles.join(' ');
    return element;
}
function lazyLoadImage(image, imagePath, defaultImagePath, errorImgPath, offset) {
    if (defaultImagePath) {
        setImage(image, defaultImagePath);
    }
    if (image.className && image.className.includes('ng-lazyloaded')) {
        image.className = image.className.replace('ng-lazyloaded', '');
    }
    return function (scrollObservable) {
        return scrollObservable
            .filter(function () { return isVisible(image, offset); })
            .take(1)
            .mergeMap(function () { return loadImage(imagePath); })
            .do(function () { return setImage(image, imagePath); })
            .map(function () { return true; })
            .catch(function () {
            if (errorImgPath) {
                setImage(image, errorImgPath);
            }
            image.className += ' ng-failed-lazyloaded';
            return Observable_1.Observable.of(false);
        })
            .do(function () { return setLoadedStyle(image); });
    };
}
exports.lazyLoadImage = lazyLoadImage;
