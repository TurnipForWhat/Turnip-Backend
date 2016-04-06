var db = require('../db');
var requireAuthentication = require('../authentication.js');

module.exports = function(app) {
  app.post('/chat/:chat_id', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      db.query("INSERT INTO Chat SET ?", [{
        chat_id: req.params.chat_id,
        body: req.body.message,
        sender: user.id,
      }], function(err, res) {
         console.log(err);
         httpRes.send({ success: true });
       });
    });
  });
  app.get('/chat/:chat_id', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      if (!req.query.last) {
        req.query.last = 0;
      }
      db.query("SELECT * FROM Chat WHERE chat_id = ? AND id > ?", [req.params.chat_id, req.query.last], function(err, res) {
        if (err) console.log(err);
        httpRes.send({ new_messages: res.length > 0, messages: res });
      });
    });
  });

  // Getting chats... ?????
  app.get('/chats', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      db.query("SELECT * FROM UserToGroupChat WHERE user = ?", [user.id], function(err, res) {
        if (err) console.log(err);
        httpRes.send(res);
      });
    });
  });

  // Creata a chat
  app.post('/chat', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      db.query("INSERT INTO GroupChat SET ?", [{
        people: user.id,
      }], function(err, res) {
         console.log(err);
         var values = req.body.users.map(function(user_id) {
           return "(" + parseInt(user_id) + ", " + res.insertId + ")";
         });
         var query = "INSERT INTO UserToGroupChat (user, chat_id) VALUES " + values.join(",");
         console.log(query);
         db.query(query, function(err, res) {
           console.log(err);
           httpRes.send({ success: true });
         });
       });
    });
  });
};

