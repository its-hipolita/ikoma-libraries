const fs = require('fs');
const path = require('path');

const xmlFilePath = './../db/database.xml';

// Function to extract card types from XML file
const extractCardTypes = () => {
    try {
        // Read XML file
        const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');

        // Find card types
        const cardTypes = new Set();
        let startIndex = 0;
        while (true) {
            const typeIndex = xmlData.indexOf('<card ', startIndex);
            if (typeIndex === -1) break;
            const endIndex = xmlData.indexOf('>', typeIndex);
            const cardType = xmlData.slice(typeIndex, endIndex).match(/type="([^"]+)"/);
            if (cardType && cardType[1]) {
                cardTypes.add(cardType[1]);
            }
            startIndex = endIndex + 1;
        }

        // Convert set to array
        const cardTypesArray = Array.from(cardTypes);

        // Output card types as JSON
        const outputFilePath = 'cardTypes.json';
        fs.writeFileSync(outputFilePath, JSON.stringify(cardTypesArray, null, 2));
        console.log(`Card types extracted and saved to ${outputFilePath}`);
    } catch (error) {
        console.error('Error extracting card types:', error);
    }
};

// Call the function to extract card types
extractCardTypes();