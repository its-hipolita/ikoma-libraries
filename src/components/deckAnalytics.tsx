import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import KeywordAnalytics from './keywordAnalytics';
import GoldCostAnalytics from './goldCostAnalytics';
import { parseKeywordsAndText } from '../services/textparser'; // Adjust the import path accordingly

const DeckAnalytics: React.FC = () => {
    const currentDeck = useSelector((state: RootState) => state.deck.currentDeck);
    const [analytics, setAnalytics] = useState<{ [key: string]: { [key: string]: number } }>({});
    const [goldCostData, setGoldCostData] = useState<any[]>([]);

    useEffect(() => {
        // Calculate keyword analytics
        const keywordCounts: { [key: string]: { [key: string]: number } } = {};

        currentDeck.forEach(card => {
            const { keywords } = parseKeywordsAndText(card.text);
            const type = card.type;

            if (!keywordCounts[type]) {
                keywordCounts[type] = {};
            }

            const plainKeywords = extractPlainWords(keywords);
            plainKeywords.forEach(keyword => {
                if (keyword) {
                    if (keywordCounts[type][keyword]) {
                        keywordCounts[type][keyword]++;
                    } else {
                        keywordCounts[type][keyword] = 1;
                    }
                }
            });
        });

        setAnalytics(keywordCounts);

        // Calculate gold cost distribution
        const maxGoldCost = Math.max(...currentDeck.map(card => parseInt(card.cost?.toString() || "0", 10)));
        const goldCostData: any[] = [];

        for (let i = 0; i <= maxGoldCost; i++) {
            const cost = i.toString();
            const dataPoint: any = { cost }; // Include cost property for each data point
            Object.keys(keywordCounts).forEach(type => {
                dataPoint[type] = 0;
            });
            goldCostData.push(dataPoint);
        }

        // Count card types for each gold cost
        currentDeck.forEach(card => {
            const cost = parseInt(card.cost?.toString() || "0", 10);
            if (!isNaN(cost)) {
                goldCostData[cost][card.type]++;
            }
        });

        setGoldCostData(goldCostData);

    }, [currentDeck]);

    // Function to extract plain words from text
    const extractPlainWords = (text: string) => {
        return text.replace(/<[^>]*>/g, '').replace(/\r?\n|\r/g, '').split(' • ').map(word => word.trim()).filter(Boolean);
    };

    return (
        <>
            <Box>
                <Typography variant="h4">Deck Analytics</Typography>
                <KeywordAnalytics analytics={analytics} />
                <GoldCostAnalytics goldCostData={goldCostData} analytics={analytics} />
            </Box>
        </>
    );
};

export default DeckAnalytics;
