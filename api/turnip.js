var db = require('../db');
var requireAuthentication = require('../authentication.js');

module.exports = function(app) {
  app.post('/toggle', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      db.query("UPDATE Users WHERE id = ? SET ?", [user.id], {
        last_toggle_time: (new Date).getTime() / 1000
      }, function(err, res) {
         httpRes.send({ success: true });
       });
    });
  });
};

