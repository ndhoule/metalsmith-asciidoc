'use strict';

var assert = require('assert');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var asciidoc = require('..');

describe('metalsmith-asciidoc', function() {
  it('should convert asciidoc files', function(done) {
    Metalsmith('test/fixtures/basic')
      .use(asciidoc())
      .build(function(err) {
        if (err) {
          return done(err);
        }

        equal('test/fixtures/basic/expected', 'test/fixtures/basic/build');

        done();
      });
  });

  it ('should accept options', function(done) {
    Metalsmith('test/fixtures/options')
      .use(asciidoc({
        attributes: {
          notitle: false
        }
      }))
      .build(function(err) {
        if (err) {
          return done(err);
        }

        equal('test/fixtures/options/expected', 'test/fixtures/options/build');

        done();
      });
  });
});