var mysql = require('mysql');
var config = require('./db-config');
var connection;
function setup() {
	connection = mysql.createConnection(config);
	connection.connect();
	connection.on('error', function(err) {
        console.log("connection error");
		console.log(err);
		setup();
	});
}
setup();

module.exports.escape = function() { connection.escape.apply(connection, Array.prototype.slice.call(arguments)) };
module.exports.query = function() {
  var parameters = Array.prototype.slice.call(arguments);
  var retry_count = 0;
  var f = function() {
    try {
      connection.query.apply(connection, parameters);
    } catch (e) {
      console.log(e);
      setup();
      if (retry_count < 5) {
        setTimeout(function() { f(); }, 100);
        retry_count++;
      }
    }
  };
  f();
}

