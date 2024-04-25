const fs = require('fs');
const path = require('path');

const xmlFilePath = path.resolve(__dirname, './../db/database.xml');
const outputFilePath = path.resolve(__dirname, 'keywordsArray.js');
const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');

const extractKeywords = (xmlData) => {
    const keywordsSet = new Set();
    const cardRegex = /<card id="[^"]+"(?: type="[^"]+")?>([\s\S]*?)<\/card>/g; // Removed type="personality" filter
    const textRegex = /<!\[CDATA\[(.*?)(?=<br><br>)/g;
    const keywordRegex = /(?<![0-9]\S)[^>&#;\s]+(?=\s*(&#8226;|<\/b>|<br>))/g;

    let match;
    while ((match = cardRegex.exec(xmlData)) !== null) {
        const text = match[1];
        let textMatch;
        while ((textMatch = textRegex.exec(text)) !== null) {
            const keywords = textMatch[1].trim();
            const keywordMatches = keywords.match(keywordRegex);
            if (keywordMatches) {
                keywordMatches.forEach(keyword => {
                    keywordsSet.add(keyword.trim());
                });
            }
        }
    }

    return Array.from(keywordsSet);
};

const keywords = extractKeywords(xmlData);

const fileContent = `const keywordsArray = ${JSON.stringify(keywords, null, 4)};\n\nmodule.exports = keywordsArray;\n`;

fs.writeFileSync(outputFilePath, fileContent);

console.log(`Keywords extracted and saved to ${outputFilePath}`);
