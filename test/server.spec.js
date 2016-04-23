var request = require('request');
var config = require('./config');
var assert = require('assert');
describe("Backend Server", function() {
  it("responds to HTTP requests", function(done) {
    request(config.API_URL + '/api/ping', function(error, response, body) {
      assert.equal(body, "200");
      done();
    });
  });
  it("can talk to the database", function(done) {
    request(config.API_URL + '/api/health', function(error, response, body) {
      assert.equal(body, "OK");
      done();
    });
  });
});
