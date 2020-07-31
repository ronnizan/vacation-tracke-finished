const dal = require("../dal/dal");

async function registerUser(user) {
  try {
    const sql = `insert into users values(default,
      '${user.firstName}',
      '${user.lastName}',
      '${user.username}',
      '${user.password}',
      0)`;
    const info = await dal.executeAsync(sql);
    user.userId = info.insertId;
    return user;
  } catch (error) {
    return false;
  }

}
async function getUser(username) {
  const sql = `select * from users where userName='${username}'`;
  const users = await dal.executeAsync(sql);
  const user = users[0];
  return user ? user : false;
}
async function getAuthUser(userId) {
  const sql = `select * from users where userId=${userId}`;
  const users = await dal.executeAsync(sql);
  const user = users[0];
  return user ? user : false;
}


module.exports = {
  registerUser,
  getUser,
  getAuthUser
};


