var request = require('request');
var config = require('./config');

describe("Backend Server", function() {
  it("responds to HTTP requests", function(done) {
    request(config.API_URL + '/api/ping', function(error, response, body) {
      expect(body).toEqual("200");
      done();
    });
  });
  it("can talk to the database", function(done) {
    request(config.API_URL + '/api/health', function(error, response, body) {
      expect(body).toEqual("200");
      done();
    });
  });
});
