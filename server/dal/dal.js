const mysql = require("mysql");

const connection = mysql.createPool({
  user: config.mysql.user,
  host: config.mysql.host,
  password: config.mysql.password,
  database: config.mysql.database,
});


  console.log("connected to DB");

function executeAsync(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = {
  executeAsync
};
