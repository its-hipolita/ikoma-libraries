import { Card } from '../app/types';

const buildDeckFromDecklistAndXML = async (decklist: string): Promise<Card[]> => {
    try {
        // Fetch the XML file containing card data
        const response = await fetch('/db/database.xml');
        const xmlText = await response.text();

        // Parse the XML document
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        // Initialize an empty deck array
        const deck: Card[] = [];

        // Split the decklist into individual lines
        const lines = decklist.split('\n');

        // Iterate through each line in the decklist
        for (const line of lines) {
            // Ignore lines that begin with "Legality:" and empty lines
            if (line.trim().startsWith('Legality:') || line.trim() === '') {
                continue;
            }

            // Extract card name and quantity from each line
            const [quantityString, ...nameParts] = line.trim().split(' ');
            let quantity = 1;
            let cardName = line.trim();

            // Check if the line contains a quantity
            if (!isNaN(parseInt(quantityString))) {
                quantity = parseInt(quantityString);
                cardName = nameParts.join(' '); // Reconstruct the card name
            }

            // Escape quotes in the card name for the XPath expression
            const escapedCardName = cardName.replace(/"/g, '\\"');

            // Find the corresponding card nodes in the XML document using XPath
            const cardNodes = xmlDoc.evaluate(`//card[name="${escapedCardName}"]`, xmlDoc, null, XPathResult.ANY_TYPE, null);

            // Create an array to hold all card nodes, including the stronghold card node
            const allCardNodes: Element[] = [];
            let cardNode = cardNodes.iterateNext() as Element;
            let strongholdCardNode: Element | null = null;
            // cardNode will only be null on strongholds
            if (cardNode === null) {
                // Find the corresponding card nodes in the XML document using XPath
                const strongholdNodes = xmlDoc.evaluate(`//card[contains(name, "${escapedCardName}")]`, xmlDoc, null, XPathResult.ANY_TYPE, null);
                strongholdCardNode = strongholdNodes.iterateNext() as Element;
            }
            while (cardNode) {
                allCardNodes.push(cardNode);
                cardNode = cardNodes.iterateNext() as Element;
            }
            // If a stronghold card node is found, add it to the array
            if (strongholdCardNode) {
                allCardNodes.push(strongholdCardNode);
            }

            // Iterate through each card node
            for (const node of allCardNodes) {
                // Extract card attributes from the XML node
                const card: Card = {
                    id: node.getAttribute('id') || '',
                    type: node.getAttribute('type') || '',
                    name: cardName,
                    rarity: node.getAttribute('rarity') || '',
                    edition: node.querySelector('edition')?.textContent || '',
                    // Select all image nodes and extract the text content of the last one
                    image: Array.from(node.querySelectorAll('image')).pop()?.textContent || '',
                    legal: Array.from(node.querySelectorAll('legal')).map(legalNode => legalNode.textContent),
                    text: node.querySelector('text')?.textContent || '',
                    cost: node.querySelector('cost')?.textContent || null,
                    focus: node.querySelector('focus')?.textContent || null,
                    clan: node.querySelector('clan')?.textContent || null,
                    force: node.querySelector('force')?.textContent || null,
                    chi: node.querySelector('chi')?.textContent || null,
                    personal_honor: node.querySelector('personal_honor')?.textContent || null,
                    honor_req: node.querySelector('honor_req')?.textContent || null,
                    gold_production: node.querySelector('gold_production')?.textContent || null,
                };

                // Add the card to the deck's list of cards multiple times based on quantity
                for (let i = 0; i < quantity; i++) {
                    // Check if the card is a stronghold and if a partial match already exists in the deck
                    if (card.type === 'stronghold') {
                        const partialMatchExists = deck.some(deckCard => deckCard.type === 'stronghold' && deckCard.name.includes(cardName));
                        // If a partial match exists, skip adding the card
                        if (partialMatchExists) {
                            continue;
                        }
                    }
                    deck.push(card);
                }
            }
        }
        return deck;
    } catch (error) {
        console.error('Error building deck:', error);
        throw error;
    }
};

export default buildDeckFromDecklistAndXML;
