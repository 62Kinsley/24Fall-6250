const messages = [];

function addMessage({ sender, text }) {
    messages.push({ sender, text });
  }

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]{0,20}$/);
  return isValid;
}

const users = {
  messages,
  addMessage,
  isValidUsername
};

module.exports = users;