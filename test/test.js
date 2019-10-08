var request = require('supertest');
var app = require('../src/server.js');

// Enkel test bare for å sjekke at serveren starter fint, det blir mer testet med Cypress
describe('GET /', function() {
  it('respond with hello world', function(done) {
    //navigate to root and check the the response is "hello world"
    request(app).get('/').expect('Hello World', done);
  });
});