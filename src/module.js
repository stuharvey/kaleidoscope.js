const _ = require('lodash');
// const fs = require('fs');
const path = require('path');
const getPixels = require('get-pixels');

const { manipulateImageData } = require('./core/image-manipulator');
const { controllerConfig } = require('./core/Constants');

const configDefaults = {};

_.each(controllerConfig, (configItem, index) => {
  configDefaults[index] = configItem.default;
});

const defaultConfig = {
  ...configDefaults,
  input: 'image.jpg',
  output: 'output',
  returnSVGString: false
};

function runWithFileAsInput(config, inputFileName, outputFileName, callback) {
  const fileNameToImport = path.join(__dirname, '..', inputFileName);

  getPixels(fileNameToImport, (err, pixels) => {
    if (err) {
      callback(`Error importing image: ${err}`);
      return;
    }

    const width = pixels.shape[0];
    const height = pixels.shape[1];

    const imageDataToUse = {
      data: pixels.data
    };

    // Do image manipulation - this mutates the image data.
    // It mutates because we're depending on some libraries that mutate it... Not my choice!
    manipulateImageData(imageDataToUse, config, width, height);

    // Run svg creation based on the image data.
    // renderSvgString(imageDataToUse.data, config, width, height, svgString => {
    //   // Write svg string to output file name.
    //   if (config.returnSVGString) {
    //     callback(false, svgString);
    //   } else {
    //     fs.writeFile(`${outputFileName}.svg`, svgString, function() {
    //       callback(false);
    //     });
    //   }
    // });
  });
}

module.exports = function(configArg, callback) {
  let config = {
    ...defaultConfig,
    ...configArg
  };

  if (_.isArray(config.input)) {
    const isOutputArray = _.isArray(config.output);

    let done = 0;
    let svgStrings = [];
    let errStrings = [];

    _.each(config.input, (inputFileName, index) => {
      const doneFunction = (err, output) => {
        done++;

        if (err) {
          errStrings.push(err);
        } else if (config.returnSVGString) {
          svgStrings.push(output);
        }

        if (done === config.input.length) {
          callback(_.isEmpty(errStrings) ? false : errStrings, svgStrings);
        }
      };

      if (isOutputArray && config.output[index]) {
        runWithFileAsInput(
          config,
          inputFileName,
          config.output[index],
          doneFunction
        );
      } else {
        // If they don't supply a corresponding output file name then we just use the input file name.
        runWithFileAsInput(
          config,
          inputFileName,
          inputFileName,
          doneFunction
        );
      }
    });
  } else {
    if (_.isArray(config.output)) {
      if (_.isEmpty(config.output)) {
        config.output = defaultConfig.output;
      } else {
        // Can't have an output array with out an input array.
        config.output = _.first(config.output);
      }
    }

    runWithFileAsInput(
      config,
      config.input,
      config.output,
      callback
    );
  }
};
