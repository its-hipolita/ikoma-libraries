import { Card } from '../app/types';
import imageList from '../services/imageList.json';

const allowedEditions = ['AM', 'AMoH', 'CRI', 'EP', 'GoC', 'GS', 'HFW', 'Ivory', 'Onyx', 'RoJ', 'ROU', 'RtR', 'SCW', 'TBS', 'TCW', 'ThA', 'TwentyFestivals'];

export async function fetchXmlData(searchTerm:string = '', limit: number = 20): Promise<Card[]> {
  try {
    console.log("searching for card named " + searchTerm);
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
        };

        cardNode.querySelectorAll('legal').forEach((legalNode) => {
          card.legal.push(legalNode.textContent || '');
        });

        if (latestEdition && latestImage && card.edition === 'Onyx' && card.name.toLowerCase().includes(searchTerm.toLowerCase())) { // TO DO
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