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
      if (err || res.length < 1) {
          httpRes.send({ success: false, reason: "invalid password" });
          return;
      }
      bcrypt.compare(req.body.password, res[0].hashed_password, function(err, match) {
        if (err || !match) {
          httpRes.send({ success: false, reason: "invalid password" });
        } else {
          httpRes.send({ success: true, login_token: res[0].login_token });
        }
      });
    });
  });

  app.post('/login/facebook', function(req, httpRes) {
    db.query("SELECT * FROM User WHERE facebook_id = ?", [req.body.facebook_id], function(err, res) {
      console.log(req.body);
      if (res && res.length > 0) {
        httpRes.send({ success: true, login_token: res[0].login_token });
      } else {
        httpRes.send({ success: false });
      }
    });
  });


  app.get('/user/:user_id', function(req, httpRes) {
    db.query("SELECT * FROM User WHERE id = ?", [req.params.user_id], function(err, res) {
      delete res.hashed_password;
      httpRes.send(res);
    });
  });

  app.get('/search', function(req, httpRes) {
    console.log(req.query);
    requireAuthentication(req, httpRes, function(loggedInUser) {
      db.query("SELECT name, id, profile_picture_id FROM User WHERE name LIKE ?", ["%" + req.query.q + "%"], function(err, res) {
        console.log(err);
        res.map(function(user) {
          user.profile_picture_id = user.profile_picture_id || '';
          user.isFriend = loggedInUser.friends_list.split(",").indexOf(user.id.toString()) != -1;
        });
        httpRes.send({ results: res });
      });
    });
  });

  app.get('/friend/request', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      db.query("SELECT `from` FROM FriendRequests WHERE `to` = ?", [user.id], function(err, res) {
        if (!res || res.length < 1) {
          httpRes.send({ success: true, results: [] });
          return;
        }
        db.query("SELECT name, id, profile_picture_id FROM User WHERE id IN (" + res.map(function(request) { return ~~request.from; }).join(",") + ")", function(err, res) {
          console.log(err);
          httpRes.send({ success: true, results: res });
        });
      });
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

  app.put('/profile', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      console.log(req.body);
      db.query("UPDATE User SET ? WHERE id = ?", [{name: req.body.name}, user.id], function(err, res) {
        console.log(err);
        console.log(res);
        httpRes.send({ success: true });
      });
    });
  });

  app.post('/gms', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      console.log("Saving GMS", req.body);
      db.query("UPDATE User SET ? WHERE id = ?", [{ gms_token: req.body.token }, user.id], function(err, res) {
        console.log(err);
        httpRes.send({ success: true });
      });
    });
  });

  app.post('/user/invite', function(req, httpRes) {
    httpRes.send({ success: true });
    // TODO
  });

  /*
   * Not critical for the demo, probably
  app.post('/user/:user_id/block', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      db.query("UPDATE User SET ?", { to: req.params.user_id, from: user.id }, function(err, res) {
        console.log(err);
        httpRes.send({ success: true });
      });
    });
  });
  */
};
