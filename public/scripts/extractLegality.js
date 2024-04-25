const fs = require('fs');

const xmlFilePath = './../db/database.xml';

// Read XML data from file
const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');

// Extract all <legal> properties using regex
const legalProperties = new Set();
const regex = /<legal>(.*?)<\/legal>/g;
let match;
while ((match = regex.exec(xmlData)) !== null) {
    legalProperties.add(match[1]);
}

// Convert set to array and sort alphabetically
const legalPropertiesArray = Array.from(legalProperties).sort();

// Write to JSON file
fs.writeFileSync('./legalProperties.json', JSON.stringify(legalPropertiesArray, null, 2));

console.log('Legal properties extracted and saved to legalProperties.json');
