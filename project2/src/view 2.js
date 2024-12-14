export function renderLogin(state) {
    let loginEl = document.querySelector('#login');
    let userChatEl = document.querySelector('#userChat');
    let inputSectionEl = document.querySelector('#inputSection');
    let content = state.errorMessage ? `<p>${state.errorMessage}</p>` : ``;
    userChatEl.innerHTML = '';
    inputSectionEl.innerHTML= '';
    loginEl.innerHTML = `
    ${content}
    <form class="login">
        <label> Username (Attention: username must be up to 20 characters)
            <input class="enterUsername" name="username" value="" placeholder="please enter your username"/>
        </label>
        <div class="button-area">
            <button type="submit">Login</button>    
        </div>
    </form>
    `;
}


export function renderUserChat(state) {
    let loginEl = document.querySelector('#login');
    let userChatEl = document.querySelector('#userChat');
    let inputSectionEl = document.querySelector('#inputSection');
    loginEl.innerHTML = `
        <p>Current User: ${state.username}</p>
        <form class="logout">
            <button type="submit">Logout</button>
        </form>
        `;

    userChatEl.innerHTML = `
        <div class="chat">
            <div id="userList"></div>
            <div id="message"></div>
    `
    inputSectionEl.innerHTML = `
        <div id="activeChat">
            <div class="sendMessage">
                <form class="send">
                    <input class="to-send" name="text" value="" placeholder="Enter your message here"/>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    `
    renderUserList(state);
    renderMessages(state);
}


export function renderUserList(state) {
    let userListEl = document.querySelector('#userList');
    userListEl.innerHTML = `
        <p>Online Users:</p>
        <ul class="users">` +
        (state.userList.length > 0 ?
            state.userList.map(user => `
                <li>
                    <div class="user">
                        <span class="username">${user}</span>
                    </div>
                </li>
                `).join('') : `<li>No users online</li>`) +
        `</ul>
    `
}


export function renderMessages(state) {
    let messageEl = document.querySelector('#message');
    messageEl.innerHTML = `
        <ul class="messages">` +
        (state.messageList.length > 0 ?
            state.messageList.map(message => `
                        <li>
                            <div class="message">
                                <div class="sender-info">
                                    <span class="username">${message.sender}</span>   
                                </div>
                                <p class="message-text">${message.text}</p>   
                            </div>
                        </li>
                    `).join('') :
            `<li>No messages yet</li>`
        ) +
        `</ul>
    `
}