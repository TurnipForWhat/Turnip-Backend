var db = require('./db');

module.exports = function(req, httpRes, callback) {
  var token = req.headers['X-Access-Token'];

  db.query("SELECT * FROM Users WHERE login_token = ?", [token], function(err, res) {
    if (err || res.length < 1) {
      httpRes.send({ success: false, reason: "Unauthorized" });
    } else {
      callback(res[0]);
    }
  });
}
