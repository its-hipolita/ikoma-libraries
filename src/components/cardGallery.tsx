import React from 'react';
import { Grid, Box, Typography, Stack } from '@mui/material';
import { Card } from '../app/types';
import { parseKeywordsAndText } from '../services/textparser';
interface CardSingleProps {
    card: Card;
}

interface CardGalleryProps {
    cards: Card[];
}

const CardSingle: React.FC<CardSingleProps> = ({ card }) => {
    const { keywords, remainingText } = parseKeywordsAndText(card.text);
    return (
            <Box display="flex" alignItems="stretch" padding="1em" position="relative">
                <img src={card.image} alt={card.name} style={{ height: '100%', width: 'auto', maxWidth: '50%', marginRight: '1em' }} />
                <Stack direction="column">
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                        {card.name}
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        <div dangerouslySetInnerHTML={{ __html: `<ul style="padding: 0">${keywords}</ul>` }}></div>
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
                        <div dangerouslySetInnerHTML={{ __html: `${remainingText}` }}></div>
                    </Typography>
                </Stack>
            </Box>
    );
};

const CardGallery: React.FC<CardGalleryProps> = ({ cards }) => {
    return (
        <Grid container spacing={4}>
            {cards.map((card, index) => (
                <Grid item key={index} xs={12} sm={6} md={6}>
                    <CardSingle card={card} />
                </Grid>
            ))}
        </Grid>
    );
};



export default CardGallery;
