var db = require('../db');
var requireAuthentication = require('../authentication.js');

module.exports = function(app) {
  app.post('/toggle', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      db.query("UPDATE User SET ? WHERE id = ?", [{
        last_toggle_time: Math.round((new Date).getTime() / 1000),
        status: req.body.status ? 1 : 0,
      }, user.id], function(err, res) {
         console.log(err);
         httpRes.send({ success: true });
       });
    });
  });

  app.post('/interests', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      var interests = req.body.activities.join(",");
      var anti_interests = req.body.anti_activities.join(",");
      db.query("UPDATE User SET ? WHERE id = ?", [{
        interests: interests,
        anti_interests: anti_interests,
      }, user.id], function(err, res) {
         console.log(err);
         httpRes.send({ success: true });
       });
    });
  });
};

