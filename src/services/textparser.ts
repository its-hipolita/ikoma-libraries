export const parseKeywordsAndText = (text: string) => {
    const startIndex = 0;
    const endIndex = text.indexOf('<br>');

    if (endIndex !== -1) {
        let keywordsText = text.substring(startIndex, endIndex);
        let remainingText = text.substring(endIndex + 4);

        // If keywordsText starts with <br>, remove it
        if (keywordsText.startsWith('<br>')) {
            keywordsText = keywordsText.substring(4);
        }

        const keywords = keywordsText.split(/&#8226;|&8226;|<br>/).map(keyword => keyword.trim()).filter(Boolean);

        let tooLongKeyword = '';

        // Filter out keywords longer than six words and prepend them to remainingText
        const filteredKeywords = keywords.filter(keyword => {
            if (keyword.split(' ').length > 6) {
                tooLongKeyword = keyword + ' ';
                return false;
            }
            return true;
        });

        const parsedKeywords = filteredKeywords.map(keyword => {
            if (keyword.startsWith('<b>') && keyword.endsWith('</b>')) {
                return `<strong>${keyword.substring(3, keyword.length - 4)}</strong>`;
            }
            return `<span>${keyword}</span>`;
        }).join(' • ');

        // Prepend the too-long keyword to remainingText
        remainingText = tooLongKeyword + remainingText;

        // Replace <b> tags with <strong> tags in remainingText
        let parsedText = remainingText.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>');

        return { keywords: parsedKeywords, remainingText: parsedText };
    }
    
    // If no <br> tag found, return the original text as remainingText
    return { keywords: '', remainingText: text };
};
