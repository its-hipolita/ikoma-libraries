const fs = require('fs');
const path = require('path');

const imagesDir = '../db/images';

const imageList = [];

// Recursively scan the images directory and add file paths to the imageList array
const scanImagesDirectory = (directory) => {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      scanImagesDirectory(filePath);
    } else {
      imageList.push(filePath.replace(imagesDir, ''));
    }
  });
};

// Start scanning the images directory
scanImagesDirectory(imagesDir);

// Write the image list to a JSON file
fs.writeFileSync('imageList.json', JSON.stringify(imageList, null, 2));