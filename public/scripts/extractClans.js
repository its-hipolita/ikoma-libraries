const fs = require('fs');

const xmlFilePath = './../db/database.xml';

// Function to extract clan values from XML file
const extractClanValues = () => {
    try {
        // Read XML file
        const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');

        // Find clan values
        const clanValues = new Set();
        let startIndex = 0;
        while (true) {
            const clanIndex = xmlData.indexOf('<clan>', startIndex);
            if (clanIndex === -1) break;
            const endIndex = xmlData.indexOf('</clan>', clanIndex);
            const clanValue = xmlData.slice(clanIndex + '<clan>'.length, endIndex);
            clanValues.add(clanValue);
            startIndex = endIndex + '</clan>'.length;
        }

        // Convert set to array
        const clanValuesArray = Array.from(clanValues);

        // Output clan values as JSON
        const outputFilePath = 'clanValues.json';
        fs.writeFileSync(outputFilePath, JSON.stringify(clanValuesArray, null, 2));
        console.log(`Clan values extracted and saved to ${outputFilePath}`);
    } catch (error) {
        console.error('Error extracting clan values:', error);
    }
};

// Call the function to extract clan values
extractClanValues();
