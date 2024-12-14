/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchWord: () => (/* binding */ fetchWord),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   updateWord: () => (/* binding */ updateWord)
/* harmony export */ });
// export function fetchSession() {
//   return fetch('/api/session', { 
//     method: 'GET',
//    })
//     .then((response) => {
//       if (!response.ok) {
//         return response.json().then((error) => Promise.reject(error));
//       }
//       return response.json();
//     });
// }

function fetchSession() {
  return fetch('/api/session/', {
    method: 'GET'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function login(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (error) {
        return Promise.reject(error);
      });
    }
    return response.json();
  });
}
function logout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchWord() {
  return fetch('/api/word', {
    method: 'GET'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (error) {
        return Promise.reject(error);
      });
    }
    return response.json();
  });
}
function updateWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (error) {
        return Promise.reject(error);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearSession: () => (/* binding */ clearSession),
/* harmony export */   getState: () => (/* binding */ getState),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setSession: () => (/* binding */ setSession),
/* harmony export */   setStoredWord: () => (/* binding */ setStoredWord)
/* harmony export */ });
var state = {
  username: '',
  storedWord: '',
  error: ''
};
function setSession(username) {
  state.username = username;
}
function clearSession() {
  state.username = '';
  state.storedWord = '';
  state.error = '';
}
function setError(error) {
  state.error = error;
}
function setStoredWord(word) {
  state.storedWord = word;
}
function getState() {
  return state;
}

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.js */ "./src/state.js");


function render() {
  var state = (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.getState)();
  var app = document.getElementById('app');
  if (!state.username) {
    app.innerHTML = "\n      <div class=\"login-view\">\n        <h2 class=\"login-title\">Login</h2>\n        <input class=\"username-input\" type=\"text\" id=\"username\" placeholder=\"Enter username\" />\n        <button class=\"login-btn\" id=\"login-btn\">Login</button>\n        <p class=\"error\">".concat(state.error, "</p >\n      </div>\n    ");
    document.getElementById('login-btn').addEventListener('click', handleLogin);
  } else {
    app.innerHTML = "\n      <div class=\"word-view\">\n        <h2>Welcome, ".concat(state.username, "!</h2>\n        <p>Your stored word: <span class=\"stored-word\">").concat(state.storedWord || 'No word stored', "</span></p >\n        <input class=\"word-input\" type=\"text\" id=\"new-word\" placeholder=\"Enter a new word\" />\n        <button class=\"update-word-btn\" id=\"update-word-btn\">Update Word</button>\n        <button class=\"logout-button\" id=\"logout-btn\">Logout</button>\n        <p class=\"error\">").concat(state.error, "</p >\n      </div>\n    ");
    document.getElementById('update-word-btn').addEventListener('click', handleUpdateWord);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
  }
}
function handleLogin() {
  var username = document.getElementById('username').value.trim();
  (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.login)(username).then(function (data) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.setSession)(data.username);
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.setError)('');
    return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchWord)();
  }).then(function (data) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.setStoredWord)(data.storedWord);
    render();
  })["catch"](function (error) {
    var errorMessage;
    if (error.error === 'auth-insufficient') {
      errorMessage = 'Access Denied';
    } else {
      errorMessage = 'Invalid username';
    }
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.setError)(errorMessage);
    render();
  });
}
function handleUpdateWord() {
  var newWord = document.getElementById('new-word').value.trim();
  (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.updateWord)(newWord).then(function (data) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.setStoredWord)(data.storedWord);
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.setError)('');
    render();
  });
}
function handleLogout() {
  (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.logout)().then(function () {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.clearSession)();
    render();
  });
}

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view.js */ "./src/view.js");



function checkSession() {
  (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (data) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.setSession)(data.username);
    return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchWord)();
  }).then(function (data) {
    (0,_view_js__WEBPACK_IMPORTED_MODULE_2__.render)();
  })["catch"](function (error) {
    if (error.error === 'auth-missing') {
      (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.clearSession)();
    }
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.setError)('');
    (0,_view_js__WEBPACK_IMPORTED_MODULE_2__.render)();
  });
}
document.addEventListener('DOMContentLoaded', function () {
  checkSession();
  (0,_view_js__WEBPACK_IMPORTED_MODULE_2__.render)();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map