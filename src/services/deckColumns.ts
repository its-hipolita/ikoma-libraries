// CardColumnService.js

import { Card } from "../app/types";

const getColumnForCardType = (cardType:string) => {
    switch (cardType) {
        case 'holding':
        case 'personality':
        case 'event':
            return 'Dynasty';
        case 'wind':
        case 'stronghold':
        case 'sensei':
            return 'Pre-game';
        default:
            return 'Fate';
    }
};

    // Function to count occurrences of each card in the deck
    const countCards = (currentDeck:Card[]) => {
        const cardCountMap: { [key: string]: number } = {}; // Map to store card counts
        currentDeck.forEach(card => {
            const cardName = card.name;
            cardCountMap[cardName] = (cardCountMap[cardName] || 0) + 1; // Increment count for each occurrence
        });
        return cardCountMap;
    };


    
export { getColumnForCardType, countCards };
