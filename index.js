var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Turnip');
});

app.listen(3000, function() {
  console.log('Turnip now running at http://localhost:3000/');
});
