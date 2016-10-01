/*!
 * Bootstrap Grunt task for Material design icons data generation
 * http://getbootstrap.com
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

'use strict';

var fs = require('fs');

module.exports = function generateMaterialIconsData(grunt) {
  // Pass encoding, utf8, so `readFileSync` will return a string instead of a
  // buffer
  var iconsFile = fs.readFileSync('less/material-design-icons.less', 'utf8');
  var iconsLines = iconsFile.split('\n');

  // Use any line that starts with ".mdi-" and capture the class name
  var iconClassName = /^\.(mdi-[a-zA-Z0-9-]+)/;
  var iconsData = '# This file is generated via Grunt task. **Do not edit directly.**\n' +
                       '# See the \'build-material-icons-data\' task in Gruntfile.js.\n\n';
  var iconsYml = 'docs/_data/material-design-icons.yml';
  for (var i = 0, len = iconsLines.length; i < len; i++) {
    var match = iconsLines[i].match(iconClassName);

    if (match !== null) {
      iconsData += '- ' + match[1] + '\n';
    }
  }

  // Create the `_data` directory if it doesn't already exist
  if (!fs.existsSync('docs/_data')) {
    fs.mkdirSync('docs/_data');
  }

  try {
    fs.writeFileSync(iconsYml, iconsData);
  } catch (err) {
    grunt.fail.warn(err);
  }
  grunt.log.writeln('File ' + iconsYml.cyan + ' created.');
};
