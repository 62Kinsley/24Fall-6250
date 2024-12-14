import model, {state} from "./state.js";
import {renderLogin, renderUserChat, renderMessages, renderUserList} from "./view.js";
import {fetchLogin, fetchCheck, fetchLogout, fetchGetMessageList, fetchSendMessage} from "./services.js";

fetchCheck()
    .catch(() => {
        model.setUsername();
        renderLogin(state);
        attachEventListeners();
    })
    .then(response => {
        if (response) {
            model.setUsername(response.username);
            model.setUserList(response.userlist);
            fetchGetMessageList()
                .then(response => {
                    if (response) {
                        model.setMessageList(response);
                        renderUserChat(state);
                        attachEventListeners();
                        poll();
                    }
                });
        }
    });

function attachEventListeners() {
    const loginForm = document.querySelector('.login');
    const sendForm = document.querySelector('.send');
    const logoutForm = document.querySelector('.logout');

    if (loginForm && !loginForm.dataset.listenerAttached) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = loginForm.querySelector('input[name="username"]').value;
            showLoadingIndicator();
            fetchLogin(username)
                .catch(err => {
                    model.setErrorMessage(err.error === 'required-username' ? 'Please enter a valid username!' : 'Access Denied!');
                    renderLogin(state);
                    attachEventListeners();
                })
                .then(response => {
                    if (response) {
                        model.setUsername(response.username);
                        model.setUserList(response.userlist);
                        model.setErrorMessage();
                        fetchGetMessageList()
                            .then(response => {
                                if (response) {
                                    model.setMessageList(response);
                                    renderUserChat(state);
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
            fetchCheck()
                .catch(() => {
                    model.setUsername();
                    renderLogin(state);
                    attachEventListeners();
                })
                .then(() => {
                    fetchLogout()
                        .then(() => {
                            model.setUsername();
                            model.setUserList();
                            model.setMessageList();
                            renderLogin(state);
                            attachEventListeners();
                        });
                });
        });
        logoutForm.dataset.listenerAttached = 'true';
    }

    if (sendForm && !sendForm.dataset.listenerAttached) {
        sendForm.addEventListener('submit', function (event) {
            event.preventDefault();
            fetchCheck()
                .catch(() => {
                    model.setUsername();
                    renderLogin(state);
                    attachEventListeners();
                })
                .then(response => {
                    if (response) {
                        model.setUsername(response.username);
                        model.setUserList(response.userlist);
                        const inputEl = sendForm.querySelector('input[name="text"]');
                        fetchSendMessage(inputEl.value)
                            .then(response => {
                                if (response) {
                                    model.setMessageList(response);
                                    renderMessages(state);
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
    fetchCheck()
        .then(response => {
            if (response) {
                model.setUsername(response.username);
                model.setUserList(response.userlist);
                fetchGetMessageList()
                    .then(response => {
                        if (response) {
                            model.setMessageList(response);
                            renderUserList(state);
                            renderMessages(state);
                            attachEventListeners();
                        }
                    });
            }
        })
        .then(() => {
            setTimeout(poll, 5000);
        });
}


function showLoadingIndicator() {
    const buttonArea = document.querySelector('.button-area');
    const indicatorEl = document.createElement('i');
    indicatorEl.className = 'gg-spinner-two-alt';
    buttonArea.appendChild(indicatorEl);
}
