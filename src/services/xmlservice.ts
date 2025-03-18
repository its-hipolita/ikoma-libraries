import { Card } from '../app/types';
import imageList from '../services/imageList.json';
import { SearchOptions } from '../app/types';
import { parseKeywordsAndText } from './textparser';
import { extractKeywords } from './extractKeywords';
const allowedEditions = ['CRI', 'GoT', 'GS', 'HFW', 'RoJ', 'ROU', 'RtR', 'ShE'];

export async function fetchXmlData(searchOptions: SearchOptions, limit: number = 100, quickSearch: boolean = false): Promise<Card[]> {
    console.log(searchOptions);
    try {
        const response = await fetch('/db/database.xml');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        const cardNodes = xmlDoc.querySelectorAll('card');
        const filteredCards: Card[] = [];
        let count = 0; // Counter to keep track of the number of results

        cardNodes.forEach((cardNode) => {
            if (count >= limit) return; // Exit loop if limit is reached

            let latestEdition = '';
            let latestImage = 'images/cards/blank.png';
            const editionNodes = cardNode.querySelectorAll('edition');
            const imageNodes = cardNode.querySelectorAll('image');
            editionNodes.forEach((editionNode, index) => {
                const edition = editionNode.textContent || '';
                if (allowedEditions.includes(edition)) {
                    latestEdition = edition;
                    latestImage = imageNodes[index].textContent || '';
                }
            });

            const imageUrlParts = latestImage.split('/');
            const imageName = imageUrlParts[imageUrlParts.length - 1];
            const hasImage = imageList.includes(imageName);
            if (latestEdition && latestImage) {
                const card: Card = {
                    id: cardNode.getAttribute('id') || '',
                    type: cardNode.getAttribute('type') || '',
                    name: cardNode.querySelector('name')?.textContent || '',
                    rarity: cardNode.querySelector('rarity')?.textContent || '',
                    edition: latestEdition,
                    image: hasImage ? latestImage : 'images/cards/blank.png',
                    legal: [],
                    text: cardNode.querySelector('text')?.textContent || '',
                    cost: cardNode.querySelector('cost')?.textContent || null,
                    focus: cardNode.querySelector('focus')?.textContent || null,
                    clan: cardNode.querySelector('clan')?.textContent || null,
                    force: cardNode.querySelector('force')?.textContent || null,
                    chi: cardNode.querySelector('chi')?.textContent || null,
                    personal_honor: cardNode.querySelector('personal_honor')?.textContent || null,
                    honor_req: cardNode.querySelector('honor_req')?.textContent || null,
                    gold_production: cardNode.querySelector('gold_production')?.textContent || null,
                    // Other properties...
                };

                cardNode.querySelectorAll('legal').forEach((legalNode) => {
                    card.legal.push(legalNode.textContent || '');
                });

                console.log(card);

                // Filter based on search options
                const searchTerm = searchOptions.searchTerm.toLowerCase();
                const legalities = searchOptions.legalities.map(l => l.toLowerCase());
                const types = searchOptions.types.map(t => t.toLowerCase());
                const clans = searchOptions.clans.map(c => c.toLowerCase());
                const textSearch = searchOptions.textSearch.toLowerCase();
                const keywords = searchOptions.keywords.map(k => k);

                const matchesSearchTerm = card.name.toLowerCase().includes(searchTerm);
                const matchesLegalities = legalities.length === 0 || legalities.some(l => card.legal.includes(l));
                const matchesTypes = types.length === 0 || types.includes(card.type.toLowerCase());
                const matchesClans = clans.length === 0 || clans.includes(card.clan?.toLowerCase() || '');
                const matchesTextSearch = card.text.toLowerCase().includes(textSearch);
                const cardKeywords = extractKeywords(parseKeywordsAndText(card.text).keywords);
                const matchesKeywords = keywords.length === 0 || keywords.every(k => cardKeywords.includes(k));
                
                // Check if card properties fall within specified ranges
                const matchesForceRange = 
                (searchOptions.forceRange[0] === '' || String(parseInt(card.force || '0')) >= searchOptions.forceRange[0]) &&
                (searchOptions.forceRange[1] === '' || String(parseInt(card.force || '0')) <= searchOptions.forceRange[1]);
            
            const matchesChiRange = 
                (searchOptions.chiRange[0] === '' || String(parseInt(card.chi || '0')) >= searchOptions.chiRange[0]) &&
                (searchOptions.chiRange[1] === '' || String(parseInt(card.chi || '0')) <= searchOptions.chiRange[1]);
            
            const matchesCostRange = 
                (searchOptions.costRange[0] === '' || String(parseInt(card.cost || '0')) >= searchOptions.costRange[0]) &&
                (searchOptions.costRange[1] === '' || String(parseInt(card.cost || '0')) <= searchOptions.costRange[1]);
            
            const matchesPersonalHonorRange = 
                (searchOptions.personalHonorRange[0] === '' || String(parseInt(card.personal_honor || '0')) >= searchOptions.personalHonorRange[0]) &&
                (searchOptions.personalHonorRange[1] === '' || String(parseInt(card.personal_honor || '0')) <= searchOptions.personalHonorRange[1]);
            
            const matchesHonorRequirementRange = 
                (searchOptions.honorRequirementRange[0] === '' || String(parseInt(card.honor_req || '0')) >= searchOptions.honorRequirementRange[0]) &&
                (searchOptions.honorRequirementRange[1] === '' || String(parseInt(card.honor_req || '0')) <= searchOptions.honorRequirementRange[1]);
            
            const matchesGoldProductionRange = 
                (searchOptions.goldProductionRange[0] === '' || String(parseInt(card.gold_production || '0')) >= searchOptions.goldProductionRange[0]) &&
                (searchOptions.goldProductionRange[1] === '' || String(parseInt(card.gold_production || '0')) <= searchOptions.goldProductionRange[1]);

                const matchesFocusValueRange = 
                (searchOptions.focusValueRange[0] === '' || String(parseInt(card.focus || '0')) >= searchOptions.focusValueRange[0]) &&
                (searchOptions.focusValueRange[1] === '' || String(parseInt(card.focus || '0')) <= searchOptions.focusValueRange[1]);

                if (matchesSearchTerm && matchesLegalities && matchesTypes && matchesClans && matchesTextSearch && matchesKeywords &&
                    matchesForceRange && matchesChiRange && matchesCostRange && matchesPersonalHonorRange &&
                    matchesHonorRequirementRange && matchesGoldProductionRange && matchesFocusValueRange) {
                    filteredCards.push(card);
                    count++;
                }
            }
        });

        return filteredCards;
    } catch (error) {
        throw new Error('Failed to fetch and filter XML data');
    }
}
