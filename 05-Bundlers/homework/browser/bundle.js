/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./browser/app.js":
/*!************************!*\
  !*** ./browser/app.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _whiteboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./whiteboard */ \"./browser/whiteboard.js\");\n// var whiteboard = require('./whiteboard.js')\r\n// import {whiteboard} from \"./whiteboard\"\r\n\r\nvar socket = window.io(window.location.origin)\r\n\r\nsocket.on('connect', function () {\r\n  console.log('Connected!')\r\n})\r\n\r\nsocket.on('load', function (strokes) {\r\n  strokes.forEach(function (stroke) {\r\n    var start = stroke.start\r\n    var end = stroke.end\r\n    var color = stroke.color\r\n    _whiteboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].draw(start, end, color, false)\r\n  })\r\n})\r\n\r\nsocket.on('draw', function (start, end, color) {\r\n  _whiteboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].draw(start, end, color, false)\r\n})\r\n\r\n_whiteboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on('draw', function (start, end, color) {\r\n  socket.emit('draw', start, end, color)\r\n})\r\n\n\n//# sourceURL=webpack://05-bundlers/./browser/app.js?");

/***/ }),

/***/ "./browser/event-emitter.js":
/*!**********************************!*\
  !*** ./browser/event-emitter.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nwindow.EventEmitter = EventEmitter\r\n\r\n// our EventEmitter constructor function\r\nfunction EventEmitter() {\r\n  this.subscribers = {}\r\n}\r\n\r\n// To be used like:\r\n// instanceOfEE.on('touchdown', cheerFn);\r\nEventEmitter.prototype.on = function (eventName, eventListener) {\r\n  // If this instance's subscribers object does not yet\r\n  // have the key matching the given event name, create the\r\n  // key and assign the value of an empty array.\r\n  if (!this.subscribers[eventName]) {\r\n    this.subscribers[eventName] = []\r\n  }\r\n\r\n  // Push the given listener function into the array\r\n  // located on the instance's subscribers object.\r\n  this.subscribers[eventName].push(eventListener)\r\n}\r\n\r\n// To be used like:\r\n// instanceOfEE.emit('codec', 'Hey Snake, Otacon is calling!');\r\nEventEmitter.prototype.emit = function (eventName) {\r\n  // If there are no subscribers to this event name, why even?\r\n  if (!this.subscribers[eventName]) {\r\n    return\r\n  }\r\n\r\n  // Grab the remaining arguments to our emit function.\r\n  var remainingArgs = [].slice.call(arguments, 1)\r\n\r\n  // For each subscriber, call it with our arguments.\r\n  this.subscribers[eventName].forEach(function (listener) {\r\n    listener.apply(null, remainingArgs)\r\n  })\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventEmitter);\r\n\n\n//# sourceURL=webpack://05-bundlers/./browser/event-emitter.js?");

/***/ }),

/***/ "./browser/whiteboard.js":
/*!*******************************!*\
  !*** ./browser/whiteboard.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-emitter */ \"./browser/event-emitter.js\");\n// var EventEmitter = require('./event-emitter.js')\r\n// import { EventEmitter } from './event-emitter'\r\n\r\n\r\nwindow.whiteboard = new _event_emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\r\n\r\n// Ultimately, the color of our stroke;\r\nvar color\r\n\r\n// The color selection elements on the DOM.\r\nvar colorElements = [].slice.call(document.querySelectorAll('.marker'))\r\n\r\ncolorElements.forEach(function (el) {\r\n  // Set the background color of this element\r\n  // to its id (purple, red, blue, etc).\r\n  el.style.backgroundColor = el.id\r\n\r\n  // Attach a click handler that will set our color variable to\r\n  // the elements id, remove the selected class from all colors,\r\n  // and then add the selected class to the clicked color.\r\n  el.addEventListener('click', function () {\r\n    color = this.id\r\n    document.querySelector('.selected').classList.remove('selected')\r\n    this.classList.add('selected')\r\n  })\r\n})\r\n\r\nvar canvas = document.getElementById('paint')\r\n\r\nvar ctx = canvas.getContext('2d')\r\n\r\nfunction resize() {\r\n  // Unscale the canvas (if it was previously scaled)\r\n  ctx.setTransform(1, 0, 0, 1, 0, 0)\r\n\r\n  // The device pixel ratio is the multiplier between CSS pixels\r\n  // and device pixels\r\n  var pixelRatio = window.devicePixelRatio || 1\r\n\r\n  // Allocate backing store large enough to give us a 1:1 device pixel\r\n  // to canvas pixel ratio.\r\n  var w = canvas.clientWidth * pixelRatio,\r\n    h = canvas.clientHeight * pixelRatio\r\n  if (w !== canvas.width || h !== canvas.height) {\r\n    // Resizing the canvas destroys the current content.\r\n    // So, save it...\r\n    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)\r\n\r\n    canvas.width = w\r\n    canvas.height = h\r\n\r\n    // ...then restore it.\r\n    ctx.putImageData(imgData, 0, 0)\r\n  }\r\n\r\n  // Scale the canvas' internal coordinate system by the device pixel\r\n  // ratio to ensure that 1 canvas unit = 1 css pixel, even though our\r\n  // backing store is larger.\r\n  ctx.scale(pixelRatio, pixelRatio)\r\n\r\n  ctx.lineWidth = 5\r\n  ctx.lineJoin = 'round'\r\n  ctx.lineCap = 'round'\r\n}\r\n\r\nresize()\r\nwindow.addEventListener('resize', resize)\r\n\r\nvar currentMousePosition = { x: 0, y: 0 }\r\nvar lastMousePosition = { x: 0, y: 0 }\r\n\r\nvar drawing = false\r\n\r\ncanvas.addEventListener('mousedown', function (e) {\r\n  drawing = true\r\n  currentMousePosition.x = e.pageX - this.offsetLeft\r\n  currentMousePosition.y = e.pageY - this.offsetTop\r\n})\r\n\r\ncanvas.addEventListener('mouseup', function () {\r\n  drawing = false\r\n})\r\n\r\ncanvas.addEventListener('mousemove', function (e) {\r\n  if (!drawing) return\r\n\r\n  lastMousePosition.x = currentMousePosition.x\r\n  lastMousePosition.y = currentMousePosition.y\r\n\r\n  currentMousePosition.x = e.pageX - this.offsetLeft\r\n  currentMousePosition.y = e.pageY - this.offsetTop\r\n\r\n  whiteboard.draw(lastMousePosition, currentMousePosition, color, true)\r\n})\r\n\r\nwhiteboard.draw = function (start, end, strokeColor, shouldBroadcast) {\r\n  // Draw the line between the start and end positions\r\n  // that is colored with the given color.\r\n  ctx.beginPath()\r\n  ctx.strokeStyle = strokeColor || 'black'\r\n  ctx.moveTo(start.x, start.y)\r\n  ctx.lineTo(end.x, end.y)\r\n  ctx.closePath()\r\n  ctx.stroke()\r\n\r\n  // If shouldBroadcast is truthy, we will emit a draw event to listeners\r\n  // with the start, end and color data.\r\n  if (shouldBroadcast) {\r\n    whiteboard.emit('draw', start, end, strokeColor)\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (whiteboard);\r\n\n\n//# sourceURL=webpack://05-bundlers/./browser/whiteboard.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./browser/app.js");
/******/ 	
/******/ })()
;