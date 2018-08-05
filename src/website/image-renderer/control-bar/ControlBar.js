import _ from 'lodash';
import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './ControlBar.css';

export default function ControlBar(props) {
  const {
    onConfigChange,
    onCreateNewConfigClicked,
    onDeleteConfigClicked,
    onDownloadSVGClicked,
    onImportNewImageClicked,
    onRevertClicked,
    onSaveConfigClicked,
    currentConfigName,
    configNames
  } = props;

  const selectOptions = _.map(configNames, name => {
    return {
      value: name,
      label: name,
      className: 'klyd-control-bar-config-item'
    };
  });

  return (
    <div className="klyd-top-control-bar">
      <div className="klyd-control-bar-left">
        <div className="klyd-control-bar-config-selector-container">
          <Select
            className="klyd-control-bar-config-selector"
            clearable={false}
            name="form-field-name"
            value={currentConfigName}
            onChange={newConfig => {
              if (newConfig) {
                onConfigChange(newConfig.value);
              }
            }}
            options={selectOptions}
          />
        </div>
        <div
          className="klyd-control-bar-button"
          onClick={onCreateNewConfigClicked}
        >
          New
        </div>
        <div className="klyd-control-bar-button" onClick={onSaveConfigClicked}>
          Save
        </div>
        <div className="klyd-control-bar-button" onClick={onRevertClicked}>
          Revert
        </div>
        <div
          className="klyd-control-bar-button"
          onClick={onDeleteConfigClicked}
        >
          Delete
        </div>
      </div>
      <div className="klyd-control-bar-right">
        <div
          className="klyd-control-bar-button"
          onClick={onImportNewImageClicked}
        >
          Import New Image
        </div>
        <div
          className="klyd-control-bar-button"
          onClick={onDownloadSVGClicked}
        >
          Download SVG
        </div>
      </div>
    </div>
  );
}
