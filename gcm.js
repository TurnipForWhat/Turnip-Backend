var db = require('./db');
var config = require('./gcm-config.json');
var request = require('request');

exports.sendMessageToUser = function(user_id, message) {
  db.query("SELECT * FROM User WHERE id = ?", [user_id], function(err, res) {
    if (err) console.log(err);
    if (!res || res.length < 1) return;
    console.log(config);
    console.log(res);
    request.post({ uri: 'https://gcm-http.googleapis.com/gcm/send',
      headers: {
        'Authorization': 'key=' + config.key,
        'Content-Type': 'application/json'
      },
      json: { data: message, to: res[0].gms_token }
    });
  });
};

