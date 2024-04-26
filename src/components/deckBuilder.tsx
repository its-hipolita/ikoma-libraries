import React, { useState, useEffect } from 'react';
import { Stack, Typography, Popover, Card, CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const DeckBuilder: React.FC = () => {
    const currentDeck = useSelector((state: RootState) => state.deck.currentDeck);
    const [anchorEls, setAnchorEls] = useState<(HTMLElement | null)[]>(Array(currentDeck.length).fill(null));

    const handlePopoverOpen = (cardName: string, event: React.MouseEvent<any>) => {
        const cardIndex = currentDeck.findIndex(card => card.name === cardName);
        if (cardIndex !== -1) {
            const newAnchorEls = anchorEls.slice();
            newAnchorEls[cardIndex] = event.currentTarget;
            setAnchorEls(newAnchorEls);
        }
    };
    

    const handlePopoverClose = () => {
        setAnchorEls(Array(currentDeck.length).fill(null));
    };

    useEffect(() => {
        console.log('Current Deck:', currentDeck);
    }, [currentDeck]);

    // Function to count occurrences of each card in the deck
    const countCards = () => {
        const cardCountMap: { [key: string]: number } = {}; // Map to store card counts
        currentDeck.forEach(card => {
            const cardName = card.name;
            cardCountMap[cardName] = (cardCountMap[cardName] || 0) + 1; // Increment count for each occurrence
        });
        return cardCountMap;
    };
// Function to determine the appropriate column for each card type
const getColumnForCardType = (cardType: string): string => {
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

// Render unique card names with their counts grouped by type
const renderCardCounts = () => {
    const cardCounts = countCards();
    const columns: { [key: string]: JSX.Element[] } = {
        'Pre-game': [],
        'Dynasty': [],
        'Fate': [],
    };

    // Group cards by type
    Object.entries(cardCounts).forEach(([cardName, count]) => {
        const cardType = currentDeck.find(card => card.name === cardName)?.type;
        if (cardType) {
            const popoverId = `mouse-over-popover-${cardName}`;
            const popoverOpen = Boolean(anchorEls[currentDeck.findIndex(card => card.name === cardName)]);
            columns[getColumnForCardType(cardType)].push(
                <React.Fragment key={cardName}>
                    <Typography mb={1}
                        aria-owns={popoverOpen ? popoverId : undefined}
                        aria-haspopup="true"
                        onMouseEnter={(event) => handlePopoverOpen(cardName, event)}
                        onMouseLeave={handlePopoverClose}
                    >
                        {count} {cardName}
                    </Typography>
                    <Popover
                        id={popoverId}
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={popoverOpen}
                        anchorEl={anchorEls[currentDeck.findIndex(card => card.name === cardName)]}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Card>
                            <CardMedia
                                component="img"
                                height="400"
                                image={currentDeck.find(card => card.name === cardName)?.image || ''}
                                alt={cardName}
                            />
                        </Card>
                    </Popover>
                </React.Fragment>
            );
        }
    });

    // Render each column
    return (
        <Stack direction="row" spacing={2}>
            {Object.entries(columns).map(([columnName, cards], index) => (
                <Stack key={index} sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" mb={1}>
                        {columnName}
                    </Typography>
                    {cards}
                </Stack>
            ))}
        </Stack>
    );
};



    return (
        <Stack sx={{ width: '50%', p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Deck Builder
            </Typography>
            {currentDeck.length === 0 ? (
                <Typography variant="body1">Your deck is empty.</Typography>
            ) : (
                <div>
                    {renderCardCounts()}
                </div>
            )}
        </Stack>
    );
};

export default DeckBuilder;
