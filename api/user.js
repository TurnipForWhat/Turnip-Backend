var db = require('../db');
var bcrypt = require('bcrypt');
var requireAuthentication = require('../authentication.js');

module.exports = function(app) {
  app.post('/signup', function(req, httpRes) {
    var token = Math.random().toString(36);
    bcrypt.hash(req.body.password, 11, function(err, res) {
      db.query("INSERT INTO User SET ?",
       { name: req.body.name,
         email: req.body.email,
         hashed_password: res,
         facebook_id: req.body.fbid,
         login_token: token,
       }, function(err, res) {
         httpRes.send({ success: true, login_token: token });
       });
    });
  });

  app.post('/login', function(req, httpRes) {
    db.query("SELECT * FROM User WHERE email = ?", [req.body.email], function(err, res) {
      bcrypt.compare(req.body.password, res[0].hashed_password, function(err, match) {
        if (err || !match) {
          httpRes.send({ success: false, reason: "invalid password" });
        } else {
          httpRes.send({ success: true, login_token: res[0].login_token });
        }
      });
    });
  });

  app.get('/user/:user_id', function(req, httpRes) {
    db.query("SELECT * FROM User WHERE id = ?", [req.params.user_id], function(err, res) {
      delete res.hashed_password;
      httpRes.send(res);
    });
  });

  app.post('/friend/request/:user_id', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      db.query("INSERT INTO FriendRequests SET ?", { to: req.params.user_id, from: user.id }, function(err, res) {
        console.log(err);
        httpRes.send({ success: true });
      });
    });
  });

  app.delete('/friend/request/:user_id', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      db.query("DELETE FROM FriendRequests WHERE `to` = ? AND `from` = ?", [req.params.user_id, user.id], function(err, res) {
        console.log(err);
        httpRes.send({ success: true });
      });
    });
  });
};
