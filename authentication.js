var db = require('./db');

module.exports = function(req, httpRes, callback) {
  var token = req.headers['x-access-token'];

  console.log(token);
  db.query("SELECT * FROM User WHERE login_token = ?", [token], function(err, res) {
    if (err || res.length < 1) {
      console.log(err);
      httpRes.send({ success: false, reason: "Unauthorized" });
    } else {
      console.log("Auth successful");
      callback(res[0]);
    }
  });
}
