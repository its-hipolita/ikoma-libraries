import React, { useState } from 'react';
import { Grid, Typography, IconButton, Stack } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material'; // Import plus and minus icons
import { Card } from '../app/types';
import { parseKeywordsAndText } from '../services/textparser';
import { useDispatch } from 'react-redux';
import { addToDeck } from '../app/store';
import Pagination from '@mui/material/Pagination';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { useTheme } from '@mui/material/styles';
interface CardSingleProps {
    card: Card;
}

interface CardGalleryProps {
    cards: Card[];
}

const CardSingle: React.FC<CardSingleProps> = ({ card }) => {
    const { keywords, remainingText } = parseKeywordsAndText(card.text);
    const theme = useTheme();
    const dispatch = useDispatch();
    const location = useLocation(); // Get current route location

    const handleAddToDeck = () => {
        dispatch(addToDeck(card));
    };

    return (
        <div style={{ position: 'relative' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                            fontWeight: 'bold',
                            textAlign: {
                                xs: 'left',  // Align left for xs and smaller
                                sm: 'center', // Align center for sm and larger
                            }
                        }}
                    >
                        {card.name}
                    </Typography>
                </Grid>

                <Grid item xs={location.pathname === '/deckbuilder' ? 2 : 4} >
                    <img src={card.image} alt={card.name} style={{ maxWidth: '100%', height: 'auto', position: 'relative' }} />
                    <div style={{ position: 'absolute', top: '10px', right: '0', padding: '0.5rem' }}>
                        <IconButton aria-label="remove" size="small">
                            <RemoveCircle sx={{ color: theme.palette.primary.main }} />
                        </IconButton>
                        <IconButton aria-label="add" size="small" onClick={handleAddToDeck}>
                            <AddCircle sx={{ color: theme.palette.primary.main }}/>
                        </IconButton>
                    </div>
                </Grid>
                <Grid item xs={location.pathname === '/deckbuilder' ? 10 : 8} >
                    {keywords.length > 0 && (
                        <Typography variant="body1" sx={{ textAlign: 'left' }}>
                            <div dangerouslySetInnerHTML={{ __html: `<ul style="padding: 0; margin-top: 0">${keywords}</ul>` }}></div>
                        </Typography>
                    )}
                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
                        <div dangerouslySetInnerHTML={{ __html: `${remainingText}` }}></div>
                    </Typography>
                </Grid>
            </Grid>
            {/* <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
                <IconButton aria-label="remove" size="small">
                    <RemoveCircleOutline />
                </IconButton>
                <IconButton aria-label="add" size="small" onClick={handleAddToDeck}>
                    <AddCircleOutline />
                </IconButton>
            </div> */}
        </div>
    );
};

const CardGallery: React.FC<CardGalleryProps> = ({ cards }) => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;
    const totalPages = Math.ceil(cards.length / itemsPerPage);
    const location = useLocation(); // Get current route location

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const slicedCards = cards.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    if (slicedCards.length === 0) {
        return (
            <Typography variant="h5" align="center" sx={{ mt: 4 }}>
                Search returned zero results.
            </Typography>
        );
    }

    return (
        <>
            <Stack direction="row" justifyContent="center" mb={1}>
                <Pagination count={totalPages} page={page} onChange={handleChangePage} />
            </Stack>
            <Grid container spacing={location.pathname === '/deckbuilder' ? 0 : 4}>
                {slicedCards.map((card, index) => (
                    <Grid item key={index} xs={12} sm={location.pathname === '/deckbuilder' ? 12 : 6} md={location.pathname === '/deckbuilder' ? 12 : 4}>
                        <CardSingle card={card} />
                    </Grid>
                ))}
            </Grid>
            <Stack direction="row" justifyContent="center" mt={2}>
                <Pagination count={totalPages} page={page} onChange={handleChangePage} />
            </Stack>
        </>
    );
}

export default CardGallery;
