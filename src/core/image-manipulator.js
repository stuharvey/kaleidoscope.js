function kaleidoscopeImage(
  imageData,
  settings,
  width,
  height
) {
  for (let i = 0; i < height * 4; i += 4) {
    for (let k = 0; k < width * 4; k += 4) {
      if (k > width / 2) {
        break;
      }

      const pixelPos = (k * i) + i;
      const flipPixelPos = (k * i) + (width - i);

      imageData.data[pixelPos] = imageData.data[flipPixelPos];
      imageData.data[pixelPos + 1] = imageData.data[flipPixelPos + 1];
      imageData.data[pixelPos + 2] = imageData.data[flipPixelPos + 2];
      imageData.data[pixelPos + 3] = imageData.data[flipPixelPos + 3];
    }
  }
}

// This returnsa  new image data manipulated according to the passed settings.
module.exports = function(imageData, imageSettings, width, height) {
  kaleidoscopeImage(imageData, imageSettings, width, height);
};
