/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToCart: () => (/* binding */ addToCart),
/* harmony export */   checkout: () => (/* binding */ checkout),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   removeFromCart: () => (/* binding */ removeFromCart),
/* harmony export */   toggleCart: () => (/* binding */ toggleCart),
/* harmony export */   updateCount: () => (/* binding */ updateCount)
/* harmony export */ });
var state = {
  products: {
    'Jorts': {
      id: '1',
      price: 0.99,
      url: 'http://placehold.co/100x100?text=Jorts',
      count: 0
    },
    'Jean': {
      id: '2',
      price: 3.14,
      url: 'http://placehold.co/100x100?text=Jean',
      count: 0
    },
    'Nyancat': {
      id: '3',
      price: 2.73,
      url: 'http://placehold.co/100x100?text=Nyancat',
      count: 0
    }
  },
  cart: {},
  cartShown: false
};
function addToCart(productName) {
  state.products[productName].count++;
}
function updateCount(productName, count) {
  state.products[productName].count = count;
}
function removeFromCart(productName) {
  if (state.products[productName].count > 0) {
    state.products[productName].count = 0;
  }
}
function checkout() {
  for (var productName in state.products) state.products[productName].count = 0;
  toggleCart();
}
function toggleCart() {
  state.cartShown = !state.cartShown;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function render(state, appEl) {
  var products = renderProducts(state);
  var cart = renderCart(state);
  appEl.innerHTML = "\n        ".concat(products, "\n        ").concat(cart, "\n    ");
}
function renderProducts(state) {
  var productListHTML = "<ul class=\"product\">";
  for (var _i = 0, _Object$entries = Object.entries(state.products); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      productName = _Object$entries$_i[0],
      details = _Object$entries$_i[1];
    productListHTML += "\n            <li>\n                <img src=\"".concat(details.url, "\" alt=\"").concat(productName, "\">\n                <span class= \"product-name\">").concat(productName, "</span>\n                <span class= \"product-price\">").concat(details.price, "</span>\n                <button class=\"add-to-cart\" type=\"button\">Add to Cart</button>\n            </li>\n        ");
  }
  return productListHTML + "</ul>";
}
function renderCart(state) {
  var totalCount = 0;
  for (var _i2 = 0, _Object$entries2 = Object.entries(state.products); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
      productName = _Object$entries2$_i[0],
      details = _Object$entries2$_i[1];
    totalCount += details.count;
  }
  if (state.cartShown && totalCount > 0) {
    var productListHTML = "\n            <button class=\"view\" type=\"button\">Hide Cart</button>\n            <ul class=\"cart\">\n        ";
    for (var _i3 = 0, _Object$entries3 = Object.entries(state.products); _i3 < _Object$entries3.length; _i3++) {
      var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
        _productName = _Object$entries3$_i[0],
        _details = _Object$entries3$_i[1];
      if (_details.count > 0) {
        productListHTML += "\n                  <li>\n                        <img src=\"".concat(_details.url, "\" alt=\"").concat(_productName, "\">\n                        <span class= \"product-name\">").concat(_productName, "</span> \n                        <input type=\"number\" name=\"quantity\" min=\"0\" value=\"").concat(_details.count, "\">\n                        <span class=\"total-price\">$").concat((_details.price * _details.count).toFixed(2), "</span>\n                        <button class=\"remove-from-cart\">Remove</button>\n                    </li>\n                ");
      }
    }
    var totalCost = 0;
    for (var _i4 = 0, _Object$entries4 = Object.entries(state.products); _i4 < _Object$entries4.length; _i4++) {
      var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
        _productName2 = _Object$entries4$_i[0],
        _details2 = _Object$entries4$_i[1];
      totalCost += _details2.price * _details2.count;
    }
    return productListHTML + "\n                </ul>\n                <p>Total: $".concat(totalCost.toFixed(2), "</p>\n                <button class=\"check-out-button\" type=\"button\">Checkout</button>\n        \n        ");
  } else if (state.cartShown) {
    return "\n            <button class=\"view\" type=\"button\">Hide Cart</button> \n            <p>Nothing in the cart</p>\n        ";
  } else {
    if (totalCount > 0) {
      return "<button class=\"view\" type=\"button\">View Cart (".concat(totalCount, ")</button>");
    } else {
      return "<button class=\"view\" type=\"button\">View Cart</button>";
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");


var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
appEl.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('add-to-cart')) {
    (0,_model__WEBPACK_IMPORTED_MODULE_0__.addToCart)(e.target.closest('li').querySelector('.product-name').textContent);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
  if (e.target.classList.contains('view')) {
    (0,_model__WEBPACK_IMPORTED_MODULE_0__.toggleCart)();
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
  if (e.target.classList.contains('remove-from-cart')) {
    var productName = e.target.closest('li').querySelector('.product-name').textContent;
    (0,_model__WEBPACK_IMPORTED_MODULE_0__.removeFromCart)(productName);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
  if (e.target.classList.contains('check-out-button')) {
    (0,_model__WEBPACK_IMPORTED_MODULE_0__.checkout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
});
appEl.addEventListener('input', function (e) {
  (0,_model__WEBPACK_IMPORTED_MODULE_0__.updateCount)(e.target.closest('li').querySelector('.product-name').textContent, e.target.value);
  (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map