import _ from 'lodash';
import React, { Component } from 'react';

import './ImageRenderer.css';

import manipulateImageData from '../../core/image-manipulator';

export default class ImageRenderer extends Component {
  constructor(props) {
    super(props);

    this.imageURI = this.props.imageURI;

    this.state = {
      imageLoadingError: false,
      isRendered: false,
      isRendering: false,
      loadingImage: true
    };
  }

  componentDidMount() {
    // Listen for changes on all of the image changing controls.
    _.each(
      this.props.controller.imageChangingControls,
      imageChangingControl => {
        imageChangingControl.onFinishChange(() => {
          this.updateCanvasRender();
        });
      }
    );


    this.renderFirstTimeImage();
  }

  onImportNewImageClicked = () => {
    this.hiddenImageChooser.focus();
    this.hiddenImageChooser.click();
  };

  canvasRef = null;
  imageURI = null;
  renderedImage = null;

  handleImageChange = () => {
    if (
      !this.state.loadingImage &&
      this.hiddenImageChooser.files &&
      this.hiddenImageChooser.files[0]
    ) {
      this.setState({
        imageLoadingError: false,
        loadingImage: true
      });

      const reader = new FileReader();

      reader.onloadend = () => {
        this.imageURI = reader.result;

        this.setState({
          loadingImage: false,
          imageLoaded: true
        });

        setImmediate(() => this.renderFirstTimeImage());
      };

      reader.onerror = () => {
        this.setState({
          loadingImage: false,
          imageLoadingError: true
        });
      };

      setImmediate(() => {
        reader.readAsDataURL(this.hiddenImageChooser.files[0]);
      });
    }
  };

  renderFirstTimeImage() {
    // TODO: Offload hard things to web workers.
    if (this.imageURI) {
      this.setState({
        isRendering: true,
        isRendered: false
      });

      const htmlRenderedImage = new Image();

      htmlRenderedImage.onload = () => {
        this.canvasRef.width = htmlRenderedImage.width;
        this.canvasRef.height = htmlRenderedImage.height;

        this.height = htmlRenderedImage.height;
        this.width = htmlRenderedImage.width;

        const ctx = this.canvasRef.getContext('2d');
        this.renderedImage = htmlRenderedImage;
        ctx.drawImage(htmlRenderedImage, 0, 0, this.width, this.height);
        this.imageData = ctx.getImageData(0, 0, this.width, this.height);

        manipulateImageData(
          this.imageData,
          this.props.controller.config,
          this.width,
          this.height
        );

        ctx.putImageData(this.imageData, 0, 0);

        // Check if no updates here.
        this.setState({
          isRendered: true,
          isRendering: false,
          loadingImage: false
        });
      };

      htmlRenderedImage.src = this.imageURI;
    }
  }

  updateCanvasRender() {
    // TODO: Offload hard things to web workers.
    // TODO: Version of render management.
    if (
      this.renderedImage &&
      !this.state.isRendering
    ) {
      this.setState({
        isRendering: true,
        isRendered: false
      });

      const ctx = this.canvasRef.getContext('2d');
      ctx.drawImage(this.renderedImage, 0, 0, this.width, this.height);
      this.imageData = ctx.getImageData(0, 0, this.width, this.height);

      manipulateImageData(
        this.imageData,
        this.props.controller.config,
        this.width,
        this.height
      );

      ctx.putImageData(this.imageData, 0, 0);

      // Check if no updates here.
      this.setState({
        isRendered: true,
        isRendering: false
      });
    }
  }

  render() {
    const {
      isRendered,
      isRendering,
      loadingImage
    } = this.state;

    return (
      <div className="klyd-image-renderer">
        <input
          accept="image/*"
          onChange={() => this.handleImageChange()}
          ref={ref => {
            this.hiddenImageChooser = ref;
          }}
          type="file"
        />
        {loadingImage && <p>Loading Image...</p>}
        {isRendering && <p>Building Image...</p>}
        <div className="klyd-image-showing-window">
          <div className="klyd-demo-panel">
            <canvas
              style={{
                visibility: isRendered && !isRendering ? 'visible' : 'hidden'
              }}
              ref={ref => {
                this.canvasRef = ref;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
