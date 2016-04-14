var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');

app.use(bodyParser.json());
app.use(express.static('public'));

require("./api/user")(app);
require("./api/turnip")(app);
require("./api/chat")(app);

app.get('/', function(req, res) {
  res.send('Turnip');
});

app.get('/api/ping', function(req, res) {
  res.send('200');
});
app.get('/chat/:token/:chat_id', function(req, res) {
  res.sendFile(__dirname + "/public/chat.html");
});

app.listen(3000, function() {
  console.log('Turnip now running at http://localhost:3000/');
});
