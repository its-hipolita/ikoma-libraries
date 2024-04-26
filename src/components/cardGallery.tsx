import React from 'react';
import { Grid, Box, Typography, Stack, IconButton } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'; // Import plus and minus icons
import { Card } from '../app/types';
import { parseKeywordsAndText } from '../services/textparser';
import { useDispatch } from 'react-redux';
import { addToDeck } from '../app/store';


interface CardSingleProps {
    card: Card;
}

interface CardGalleryProps {
    cards: Card[];
}

const CardSingle: React.FC<CardSingleProps> = ({ card }) => {
    const { keywords, remainingText } = parseKeywordsAndText(card.text);
    const dispatch = useDispatch();

    const handleAddToDeck = () => {
        console.log("adding to deck: " + card.name)
        dispatch(addToDeck(card));
    };

    return (
        <div style={{ position: 'relative' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {card.name}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <img src={card.image} alt={card.name} style={{ maxWidth: '100%', height: 'auto' }} />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        <div dangerouslySetInnerHTML={{ __html: `<ul style="padding: 0">${keywords}</ul>` }}></div>
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
                        <div dangerouslySetInnerHTML={{ __html: `${remainingText}` }}></div>
                    </Typography>
                </Grid>
            </Grid>
            <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <IconButton aria-label="remove" size="small">
                    <RemoveCircleOutline />
                </IconButton>
                <IconButton aria-label="add" size="small" onClick={handleAddToDeck}>
                    <AddCircleOutline />
                </IconButton>
            </div>
        </div>
    );
};



const CardGallery: React.FC<CardGalleryProps> = ({ cards }) => {
    if (cards.length === 0) {
        return (
            <Typography variant="h5" align="center" sx={{ mt: 4 }}>
                Search returned zero results.
            </Typography>
        );
    }

    return (

        <Grid container spacing={4}>
            {cards.map((card, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                    <CardSingle card={card} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CardGallery;
