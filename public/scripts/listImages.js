const fs = require('fs');
const path = require('path');

const imagesDir = '../db/images';
const imageList = [];

// Recursively scan the images directory and add file names to the imageList array
const scanImagesDirectory = (directory) => {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      scanImagesDirectory(filePath);
    } else {
      // Extract file name without directory structure
      const fileName = path.basename(filePath);
      imageList.push(fileName);
    }
  });
};

// Start scanning the images directory
scanImagesDirectory(imagesDir);

// Output the list of image file names
console.log('List of Image File Names:');
imageList.forEach((fileName, index) => {
  console.log(`${index + 1}. ${fileName}`);
});

// Write the image list to a JSON file
fs.writeFileSync('imageList.json', JSON.stringify(imageList, null, 2));
