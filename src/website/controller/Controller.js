import _ from 'lodash';
import dat from 'dat.gui';

import './Controller.css';

import controllerConfig from '../../core/Constants';

class ControllerConfig {
  constructor() {
    _.each(controllerConfig, (configItem, index) => {
      this[index] = configItem.default;
    });
  }
}

const datConfig = {
  autoPlace: false
};

// This is a bit of a hack to force an update of dat gui.
export function updateGuiDisplay(gui) {
  // eslint-disable-next-line
  for (let i in gui.__controllers) {
    gui.__controllers[i].updateDisplay();
  }

  // eslint-disable-next-line
  for (let f in gui.__folders) {
    updateGuiDisplay(gui.__folders[f]);
  }
}

export function createController() {
  const gui = new dat.GUI(datConfig);

  const guiContainer = document.getElementById('js-dat-gui-container');
  guiContainer.appendChild(gui.domElement);

  const controller = {
    imageChangingControls: {}
  };

  const mainController = new ControllerConfig();

  controller.imageChangingControls.mirrors = gui.add(mainController, 'mirrors', 1, 50, 1);

  controller.gui = gui;
  controller.config = mainController;

  return controller;
}
