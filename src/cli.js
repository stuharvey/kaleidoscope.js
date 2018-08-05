#! /usr/bin/env node

const _ = require('lodash');
const path = require('path');
const kaleidoscope = require('./module');

const args = process.argv.slice(2);

if (args[0] === '-h' || args[0] === 'help') {
  console.log('Please look at the cli docs located at http://kaleidoscope.com/#/cli');
} else if (!args[0]) {
  console.log(
    'Error: You must supply a config json file location when running kaleidoscope.'
  );
  console.log(
    'Feel free to look at the cli docs located at http://kaleidoscope.com/#/cli'
  );
} else {
  const config = require(path.join(__dirname, '..', args[0]));

  kaleidoscope(config, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    if (config.returnSVGString) {
      if (_.isArray(result)) {
        _.each(result, resultString => {
          console.log(resultString);
        });
      } else {
        console.log(result);
      }
    }
  });
}
