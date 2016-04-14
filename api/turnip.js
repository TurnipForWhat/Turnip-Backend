var db = require('../db');
var requireAuthentication = require('../authentication.js');

var SIX_HOURS = 60 * 60 * 6;

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
    console.log(req.body);
    requireAuthentication(req, httpRes, function(user) {
      var interests = req.body.interests.join(",");
      var anti_interests = req.body.anti_interests.join(",");
      db.query("UPDATE User SET ? WHERE id = ?", [{
        interests: interests,
        anti_interests: anti_interests,
      }, user.id], function(err, res) {
         console.log(err);
         httpRes.send({ success: true });
       });
    });
  });

  app.get('/feed', function(req, httpRes) {
    requireAuthentication(req, httpRes, function(user) {
      var status = calculateStatusFromUser(user);
      var friends = user.friends_list ? user.friends_list.split(",") : [];
      console.log(friends);
      db.query("SELECT * FROM User WHERE id IN (" + friends.map(function(id) { return ~~id; }).join(",") + ")", function(err, res) {
         console.log(err);
         var friends_array = [];
         if (err) friends_array = [];
         else friends_array = res.map(function(user) {
           return {
             id: user.id,
             status: calculateStatusFromUser(user),
             name: user.name || '',
             profile_picture_id: user.profile_picture_id || '',
           };
         });
         httpRes.send({ friends: friends_array, status: status, myid: user.id, profile_picture_id: user.profile_picture_id });
       });
    });
  });

  function calculateStatusFromUser(user) {
    return !!(user.status && (((new Date).getTime() / 1000) - user.last_toggle_time) < SIX_HOURS);
  }
};
