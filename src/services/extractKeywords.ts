export const extractKeywords = (keywordsString:string) => {
    // Split the string based on the separator "•"
    const keywordParts = keywordsString.split('•');
    
    // Extract keywords from each part
    const keywords = keywordParts.map((part) => {
        // Remove leading and trailing whitespace
        const trimmedPart = part.trim();
        // Remove HTML tags using regex
        const keyword = trimmedPart.replace(/<\/?[^>]+(>|$)/g, "");
        // Return the extracted keyword
        return keyword;
    });
    
    return keywords;
};