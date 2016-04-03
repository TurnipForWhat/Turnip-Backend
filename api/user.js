var db = require('../db');
var bcrypt = require('bcrypt');

module.exports = function(app) {
  app.post('/signup', function(req, httpRes) {
    var token = Math.random().toString(36);
    hashPassword(req.body.password, function(err, res) {
      db.query("INSERT INTO Users SET ?",
       { name: req.body.name,
         email: req.body.email,
         hashed_password: res,
         facebook_id: req.body.fbid,
         login_token: loken,
       }, function(err, res) {
         httpRes.send({ success: true, login_token: token });
       });
    });
  });

  app.post('/login', function(req, httpRes) {
    db.query("SELECT * FROM Users WHERE email = ?", [req.body.email], function(err, res) {
      bcrypt.compare(res[0].hashed_password, req.body.password, function(err, match) {
        if (err || !match) {
          httpRes.send({ success: false, reason: "invalid password" });
        } else {
          httpRes.send({ success: true, login_token: res[0].login_token });
        }
      });
    });
  });
};
