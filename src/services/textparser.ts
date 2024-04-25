export const parseKeywordsAndText = (text: string) => {
    const startIndex = 0;
    const endIndex = text.indexOf('<br>');
    if (endIndex !== -1) {
        const keywordsText = text.substring(startIndex, endIndex);
        
        const keywords = keywordsText.split(/&#8226;|<br>/).map(keyword => keyword.trim()).filter(Boolean);
        const remainingText = text.substring(endIndex + 4);

        const parsedKeywords = keywords.map(keyword => {
            if (keyword.startsWith('<b>') && keyword.endsWith('</b>')) {
                return `<strong>${keyword.substring(3, keyword.length - 4)}</strong>`;
            }
            return `<span>${keyword}</span>`;
        }).join(' • ');
        let parsedText = remainingText.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>');
        return { keywords: parsedKeywords, remainingText: parsedText };
    }

    return { keywords: '', remainingText: text };
};

