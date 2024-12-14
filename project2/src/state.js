export const state = {
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

export default {setUsername, setUserList, setMessageList, setErrorMessage};