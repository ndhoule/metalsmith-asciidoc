'use strict';

var path = require('path');
var asciidoc = ( require('asciidoctor.js')() );
if (typeof(asciidoc.Asciidoctor) != 'undefined') {
  asciidoc = asciidoc.Asciidoctor(true);
}

var rAsciidoc = /\.(adoc|asciidoc)$/;

/**
 * A function that
 *
 * @param {string} filename The filename to test.
 * @return {boolean} Returns `true` if the file has a recognized Asciidoc extension, otherwise
 * `false`.
 */
var isAsciidoc = function(filename) {
  return rAsciidoc.test(filename);
};


/**
 * Converts a Javascript object to an Opal hash.
 * 
 * @param {Object} options An object containing options to pass to AsciiDoctor.
 * @return {Object} Returns the options in a format Opal can understand.
 */
var hashOptions = function(options) {
  var hash = {}

  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      var value = options[key]

      if (typeof(value) == "object" && value != null) {
        // Hash nested options.
        hash[key] = hashOptions(value);
      }
      else if (value === false) {
        // Just setting the option to false doesn't work for options that have to been unset.
        hash[key] = null;
      }
      else {
        // Copy all other values verbatim.
        hash[key] = value;
      }
    }
  }

  // Create a hash that Opal can work with.
  return Opal.hash(hash);
}

/**
 * Metalsmith plugin that converts Asciidoc documents to HTML files.
 *
 * @param {Object} [options] A list of options to pass to the Asciidoctor compiler.
 * @return {Function} A plugin function, to be consumed by Metalsmith.
 */
module.exports = function plugin(options) {
  options = options || {};

  return function(files, metalsmith, done) {
    setImmediate(done);

    Object.keys(files).forEach(function(filename) {
      if (!isAsciidoc(filename)) {
        return;
      }

      var data = files[filename];
      var dir = path.dirname(filename);
      // The name of the file, without its path or file extension.
      var baseFilename = path.basename(filename, path.extname(filename));
      // The name of the output file.
      var outpath = (dir !== '.' ? path.join(dir, baseFilename) : baseFilename) +'.html';

      // Convert the input Asciidoc to HTML and replace the file's contents
      data.contents = new Buffer(asciidoc.$convert(data.contents.toString(), hashOptions(options)));

      // Remove the old filename from the output list
      delete files[filename];

      // Add the new file to the output list
      files[outpath] = data;
    });
  };
};
