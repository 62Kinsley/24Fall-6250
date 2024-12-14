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
/* harmony export */   fetchCheck: () => (/* binding */ fetchCheck),
/* harmony export */   fetchGetMessageList: () => (/* binding */ fetchGetMessageList),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchSendMessage: () => (/* binding */ fetchSendMessage)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/v1/session/', {
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
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchCheck() {
  return fetch('/api/v1/session/', {
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
function fetchLogout() {
  return fetch('/api/v1/session', {
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
function fetchGetMessageList() {
  return fetch('/api/v1/messages', {
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
function fetchSendMessage(message) {
  return fetch('/api/v1/messages', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message
    })
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

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
var state = {
  username: '',
  userList: [],
  messageList: [],
  errorMessage: ''
};
function setUsername(username) {
  state.username = username ? username : '';
}
function setUserList(list) {
  state.userList = Array.isArray(list) ? list : [];
}
function setMessageList(list) {
  state.messageList = Array.isArray(list) ? list : [];
}
function setErrorMessage(message) {
  state.errorMessage = message ? message : '';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  setUsername: setUsername,
  setUserList: setUserList,
  setMessageList: setMessageList,
  setErrorMessage: setErrorMessage
});

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderLogin: () => (/* binding */ renderLogin),
/* harmony export */   renderMessages: () => (/* binding */ renderMessages),
/* harmony export */   renderUserChat: () => (/* binding */ renderUserChat),
/* harmony export */   renderUserList: () => (/* binding */ renderUserList)
/* harmony export */ });
function renderLogin(state) {
  var loginEl = document.querySelector('#login');
  var userChatEl = document.querySelector('#userChat');
  var inputSectionEl = document.querySelector('#inputSection');
  var content = state.errorMessage ? "<p>".concat(state.errorMessage, "</p>") : "";
  userChatEl.innerHTML = '';
  inputSectionEl.innerHTML = '';
  loginEl.innerHTML = "\n    ".concat(content, "\n    <form class=\"login\">\n        <label> Username (Attention: username must be up to 20 characters)\n            <input class=\"enterUsername\" name=\"username\" value=\"\" placeholder=\"please enter your username\"/>\n        </label>\n        <div class=\"button-area\">\n            <button type=\"submit\">Login</button>    \n        </div>\n    </form>\n    ");
}
function renderUserChat(state) {
  var loginEl = document.querySelector('#login');
  var userChatEl = document.querySelector('#userChat');
  var inputSectionEl = document.querySelector('#inputSection');
  loginEl.innerHTML = "\n        <p>Current User: ".concat(state.username, "</p>\n        <form class=\"logout\">\n            <button type=\"submit\">Logout</button>\n        </form>\n        ");
  userChatEl.innerHTML = "\n        <div class=\"chat\">\n            <div id=\"userList\"></div>\n            <div id=\"message\"></div>\n    ";
  inputSectionEl.innerHTML = "\n        <div id=\"activeChat\">\n            <div class=\"sendMessage\">\n                <form class=\"send\">\n                    <input class=\"to-send\" name=\"text\" value=\"\" placeholder=\"Enter your message here\"/>\n                    <button type=\"submit\">Send</button>\n                </form>\n            </div>\n        </div>\n    ";
  renderUserList(state);
  renderMessages(state);
}
function renderUserList(state) {
  var userListEl = document.querySelector('#userList');
  userListEl.innerHTML = "\n        <p>Online Users:</p>\n        <ul class=\"users\">" + (state.userList.length > 0 ? state.userList.map(function (user) {
    return "\n                <li>\n                    <div class=\"user\">\n                        <span class=\"username\">".concat(user, "</span>\n                    </div>\n                </li>\n                ");
  }).join('') : "<li>No users online</li>") + "</ul>\n    ";
}
function renderMessages(state) {
  var messageEl = document.querySelector('#message');
  messageEl.innerHTML = "\n        <ul class=\"messages\">" + (state.messageList.length > 0 ? state.messageList.map(function (message) {
    return "\n                        <li>\n                            <div class=\"message\">\n                                <div class=\"sender-info\">\n                                    <span class=\"username\">".concat(message.sender, "</span>   \n                                </div>\n                                <p class=\"message-text\">").concat(message.text, "</p>   \n                            </div>\n                        </li>\n                    ");
  }).join('') : "<li>No messages yet</li>") + "</ul>\n    ";
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
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./src/view.js");
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services.js */ "./src/services.js");



(0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchCheck)()["catch"](function () {
  _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUsername();
  (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderLogin)(_state_js__WEBPACK_IMPORTED_MODULE_0__.state);
  attachEventListeners();
}).then(function (response) {
  if (response) {
    _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUsername(response.username);
    _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUserList(response.userlist);
    (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchGetMessageList)().then(function (response) {
      if (response) {
        _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setMessageList(response);
        (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderUserChat)(_state_js__WEBPACK_IMPORTED_MODULE_0__.state);
        attachEventListeners();
        poll();
      }
    });
  }
});
function attachEventListeners() {
  var loginForm = document.querySelector('.login');
  var sendForm = document.querySelector('.send');
  var logoutForm = document.querySelector('.logout');
  if (loginForm && !loginForm.dataset.listenerAttached) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var username = loginForm.querySelector('input[name="username"]').value;
      showLoadingIndicator();
      (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchLogin)(username)["catch"](function (err) {
        _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setErrorMessage(err.error === 'required-username' ? 'Please enter a valid username!' : 'Access Denied!');
        (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderLogin)(_state_js__WEBPACK_IMPORTED_MODULE_0__.state);
        // hideLoadingIndicator();
        attachEventListeners();
      }).then(function (response) {
        if (response) {
          _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUsername(response.username);
          _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUserList(response.userlist);
          _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setErrorMessage();
          (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchGetMessageList)().then(function (response) {
            if (response) {
              _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setMessageList(response);
              (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderUserChat)(_state_js__WEBPACK_IMPORTED_MODULE_0__.state);
              // hideLoadingIndicator();
              attachEventListeners();
              poll();
            }
          });
        }
      });
    });
    loginForm.dataset.listenerAttached = 'true';
  }
  if (logoutForm && !logoutForm.dataset.listenerAttached) {
    logoutForm.addEventListener('submit', function (event) {
      event.preventDefault();
      (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchCheck)()["catch"](function () {
        _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUsername();
        (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderLogin)(_state_js__WEBPACK_IMPORTED_MODULE_0__.state);
        attachEventListeners();
      }).then(function () {
        (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchLogout)().then(function () {
          _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUsername();
          _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUserList();
          _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setMessageList();
          (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderLogin)(_state_js__WEBPACK_IMPORTED_MODULE_0__.state);
          attachEventListeners();
        });
      });
    });
    logoutForm.dataset.listenerAttached = 'true';
  }
  if (sendForm && !sendForm.dataset.listenerAttached) {
    sendForm.addEventListener('submit', function (event) {
      event.preventDefault();
      (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchCheck)()["catch"](function () {
        _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUsername();
        (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderLogin)(_state_js__WEBPACK_IMPORTED_MODULE_0__.state);
        attachEventListeners();
      }).then(function (response) {
        if (response) {
          _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUsername(response.username);
          _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUserList(response.userlist);
          var inputEl = sendForm.querySelector('input[name="text"]');
          (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchSendMessage)(inputEl.value).then(function (response) {
            if (response) {
              _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setMessageList(response);
              (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderMessages)(_state_js__WEBPACK_IMPORTED_MODULE_0__.state);
              inputEl.value = '';
              attachEventListeners();
              poll();
            }
          });
        }
      });
    });
    sendForm.dataset.listenerAttached = 'true';
  }
}
function poll() {
  (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchCheck)().then(function (response) {
    if (response) {
      _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUsername(response.username);
      _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setUserList(response.userlist);
      (0,_services_js__WEBPACK_IMPORTED_MODULE_2__.fetchGetMessageList)().then(function (response) {
        if (response) {
          _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].setMessageList(response);
          (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderUserList)(_state_js__WEBPACK_IMPORTED_MODULE_0__.state);
          (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderMessages)(_state_js__WEBPACK_IMPORTED_MODULE_0__.state);
          attachEventListeners();
        }
      });
    }
  }).then(function () {
    setTimeout(poll, 5000);
  });
}
function showLoadingIndicator() {
  var buttonArea = document.querySelector('.button-area');
  var indicatorEl = document.createElement('i');
  indicatorEl.className = 'gg-spinner-two-alt';
  buttonArea.appendChild(indicatorEl);
}

// function hideLoadingIndicator() {
//     const loadingElement = document.getElementById('loadingIndicator');
//     if (loadingElement) {
//         document.body.removeChild(loadingElement);
//     }
// }
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map