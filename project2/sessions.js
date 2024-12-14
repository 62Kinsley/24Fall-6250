const uuid = require('crypto').randomUUID;
const sessions = {};

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
}

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

function getUserList() {
    const userlist = [];
    Object.values(sessions).forEach(item => {
        if (!userlist.includes(item.username)) {
          userlist.push(item.username);
        }
    });
    return userlist;
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getUserList
};
