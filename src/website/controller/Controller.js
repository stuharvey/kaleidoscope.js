import _ from 'lodash';
import dat from 'dat.gui';

import './Controller.css';

import {
  controllerConfig
} from '../../core/Constants';

const CONFIG_STORAGE_KEY = 'SVGURT_CONFIG_SAVE';
const DEFAULT_CONFIG_NAME = 'Default Config';

class ControllerConfig {
  constructor() {
    this.configs = {};
    _.each(controllerConfig, (configItem, index) => {
      this[index] = configItem.default;
    });

    this.configNames = [];

    this.loadConfigFromStore();

    this.currentConfigName = DEFAULT_CONFIG_NAME;
  }

  getCurrentConfigName() {
    return this.currentConfigName;
  }

  getConfigNames() {
    return this.configNames;
  }

  loadConfigFromStore() {
    const configLoad = JSON.parse(localStorage.getItem(CONFIG_STORAGE_KEY));

    let hasDefaultKeySave = false;

    _.each(configLoad, (config, key) => {
      if (key === DEFAULT_CONFIG_NAME) {
        hasDefaultKeySave = true;
      }
      this.configs[key] = config;
      this.configNames.push(key);
    });

    if (!hasDefaultKeySave) {
      this.configNames.push(DEFAULT_CONFIG_NAME);
      this.configs[DEFAULT_CONFIG_NAME] = {};

      _.each(controllerConfig, (configItem, index) => {
        this.configs[DEFAULT_CONFIG_NAME][index] = configItem.default;
      });
    }
  }

  loadConfig(configNameToLoad) {
    if (configNameToLoad !== this.currentConfigName) {
      this.saveConfigs();

      _.each(controllerConfig, (configItem, index) => {
        this[index] = this.configs[configNameToLoad][index];
      });
      this.currentConfigName = configNameToLoad;
    }
  }

  loadConfigFromJson() {
    // console.log('loadNewConfig', newConfigName);
    // _.each(controllerConfig, (configItem, index) => {
    //   this[index] = configItem.default;
    // });
    alert('Coming soon.');
  }

  createNewConfig() {
    const newConfigName = prompt('Please enter the name of the configuration');

    if (!newConfigName || newConfigName === null) {
      return;
    }

    this.configs[newConfigName] = {};

    _.each(controllerConfig, (configItem, index) => {
      this.configs[newConfigName][index] = this[index];
    });

    this.currentConfigName = newConfigName;
    this.configNames.push(newConfigName);

    this.saveConfigs();
  }

  revertCurrentConfig() {
    _.each(controllerConfig, (configItem, index) => {
      this[index] = this.configs[this.currentConfigName][index];
    });
  }

  saveConfigs() {
    _.each(controllerConfig, (configItem, index) => {
      this.configs[this.currentConfigName][index] = this[index];
    });

    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(this.configs));
  }

  deleteConfig() {
    if (this.currentConfigName !== DEFAULT_CONFIG_NAME) {
      if (window.confirm('Are you sure you want delete this config?')) {
        this.configs[this.currentConfigName] = null;
        delete this.configs[this.currentConfigName];
        this.configNames = _.filter(
          this.configNames,
          name => name !== this.currentConfigName
        );
        this.currentConfigName = DEFAULT_CONFIG_NAME;
        _.each(controllerConfig, (configItem, index) => {
          this[index] = this.configs[DEFAULT_CONFIG_NAME][index];
        });
        this.saveConfigs();
      }
    } else {
      alert('You cannot delete the default config. Sorry :)');
    }
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
    imageChangingControls: {},
    svgChangingControls: {},
    svgSettingControls: {}
  };

  const mainController = new ControllerConfig();

  controller.gui = gui;
  controller.config = mainController;

  return controller;
}
