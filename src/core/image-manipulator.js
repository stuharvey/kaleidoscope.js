function kaleidoscopeImage(
  imageData,
  settings,
  width,
  height
) {
  const originalImageData = [...imageData.data];

  for (let i = 0; i < height; i ++) {
    for (let k = 0; k < width; k ++) {
      if (k > width / 2) {
        break;
      }

      const pixelPos = ((i * width) + k) * 4;
      // const flipPixelPos = (width * height * 4) - pixelPos;
      const flipPixelPos = (width * height * 4) - pixelPos;

      imageData.data[pixelPos] = originalImageData[flipPixelPos];
      imageData.data[pixelPos + 1] = originalImageData[flipPixelPos + 1];
      imageData.data[pixelPos + 2] = originalImageData[flipPixelPos + 2];
      imageData.data[pixelPos + 3] = originalImageData[flipPixelPos + 3];
    }
  }
}

// This returns a new image data manipulated according to the passed settings.
module.exports = function(imageData, imageSettings, width, height) {
  kaleidoscopeImage(imageData, imageSettings, width, height);
};
