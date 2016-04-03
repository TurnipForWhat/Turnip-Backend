var db = require('../db');
var requireAuthentication = require('../authentication.js');

module.exports = function(app) {
  app.post('/toggle', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      db.query("UPDATE User SET ? WHERE id = ?", [{
        last_toggle_time: Math.round((new Date).getTime() / 1000)
      }, user.id], function(err, res) {
         console.log(err);
         httpRes.send({ success: true });
       });
    });
  });
};

