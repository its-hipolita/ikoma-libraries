import { Card } from '../app/types';

export const buildSNMText = (deck: Card[], legality:string) => {
    // Define groups as sets to ensure uniqueness
    const groups: { [type: string]: Set<Card> } = {
        'stronghold, sensei, wind': new Set<Card>(),
        'holding, personality, event': new Set<Card>(),
        'other': new Set<Card>()
    };

    // Categorize cards into groups and count occurrences of each unique card
    const cardCounts: { [name: string]: number } = {};
    deck.forEach(card => {
        const cardType = card.type.toLowerCase();
        if (['stronghold', 'sensei', 'wind'].includes(cardType)) {
            groups['stronghold, sensei, wind'].add(card);
        } else if (['holding', 'personality', 'event'].includes(cardType)) {
            groups['holding, personality, event'].add(card);
        } else {
            groups['other'].add(card);
        }

        const cardName = card.name;
        cardCounts[cardName] = (cardCounts[cardName] || 0) + 1;
    });

    // Sort cards within each group by type and name
    for (const groupKey in groups) {
        const group = groups[groupKey];
        const sortedGroup = Array.from(group).sort((a, b) => {
            // Sort by type first
            const typeComparison = a.type.localeCompare(b.type);
            if (typeComparison !== 0) {
                return typeComparison;
            }
            // If types are equal, sort by name
            return a.name.localeCompare(b.name);
        });
        groups[groupKey] = new Set<Card>(sortedGroup);
    }

    // Map sorted groups to strings and join with double line breaks
    const deckText = Object.keys(groups).map(groupKey => {
        const group = groups[groupKey];
        const groupText = Array.from(group).map(card => {
            const count = cardCounts[card.name];
            if (count === 1) {
                return card.name;
            } else {
                return `${count} ${card.name}`;
            }
        }).join('\n');
        return groupText;
    }).join('\n\n'); // Double line break between groups

    console.log(deckText);
    
    // Prepare the legality line
    let formattedLegality = legality.replace(/_/g, ' '); // Replace underscores with spaces
    formattedLegality = formattedLegality.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
    if (formattedLegality === '20F') {
        formattedLegality = 'Twenty Festivals';
    }
    // Prepend the legality line to the deck text
    const finalText = `Legality: ${formattedLegality}\n\n${deckText}`;

    console.log(finalText);
    return finalText;
}
