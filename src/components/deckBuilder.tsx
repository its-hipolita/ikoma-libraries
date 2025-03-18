import React, { useState, useEffect } from 'react';
import { Stack, Typography, Popover, Card, CardMedia, Box, Select, MenuItem, Tabs, Tab, InputLabel, FormControl } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import DeckImporterButton from './deckImporter';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToDeck, removeFromDeck } from '../app/store';
import { useAppDispatch } from '../app/hooks';
import cardTypes from '../data/cardTypes'; // Importing card types
import { countCards, getColumnForCardType } from '../services/deckColumns';
import DeckAnalytics from './deckAnalytics';
import ResultsView from './resultsView';
import DeckExporterButton from './deckExporter';
import legalities from '../data/legalities';
interface CardTypeCounts {
    [key: string]: number;
}

const DeckBuilder: React.FC = () => {
    const currentDeck = useSelector((state: RootState) => state.deck.currentDeck);
    const [anchorEls, setAnchorEls] = useState<(HTMLElement | null)[]>(Array(currentDeck.length).fill(null));
    const [selectedLegality, setSelectedLegality] = useState<string>('All'); // State to store the selected legality
    const [tabValue, setTabValue] = useState<number>(0); // State to store the selected tab index

    const dispatch = useAppDispatch();
    const [cardTypeCounts, setCardTypeCounts] = useState<CardTypeCounts>(
        cardTypes.reduce((acc, type) => {
            acc[type] = 0;
            return acc;
        }, {} as CardTypeCounts)
    );

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

    // Define tab change handler
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        // Reset counts to zero before updating
        const newCounts: CardTypeCounts = { ...cardTypes.reduce((acc, type) => ({ ...acc, [type]: 0 }), {}) };
        updateCardTypeCounts(newCounts); // Pass the reset counts to the update function
    }, [currentDeck]);

    const updateCardTypeCounts = (resetCounts: CardTypeCounts) => {
        currentDeck.forEach(card => {
            resetCounts[card.type] += 1;
        });
        setCardTypeCounts(resetCounts);
    };



    const columns: { [key: string]: JSX.Element[] } = {
        'Pre-game': [],
        'Dynasty': [],
        'Fate': [],
    };
    // Inside the DeckBuilder component

    const handleLegalityChange = (event: any) => { // Adjusted event type
        setSelectedLegality(event.target.value);
    };

    const renderCardCounts = () => {
        const cardCounts = countCards(currentDeck);

        // Initialize counters for each column
        const columnCardCounts: { [key: string]: number } = {
            'Pre-game': 0,
            'Dynasty': 0,
            'Fate': 0,
        };

        // Group cards by type
        Object.entries(cardCounts).forEach(([cardName, count], index) => {

            const cardType = currentDeck.find(card => card.name === cardName)?.type;
            const cardObject: any = currentDeck.find(card => card.name === cardName);
            if (cardType) {
                const popoverId = `mouse-over-popover-${cardName}`;
                const popoverOpen = Boolean(anchorEls[currentDeck.findIndex(card => card.name === cardName)]);

                // Determine the appropriate column for the card type
                const columnName = getColumnForCardType(cardType);

                // Check if the subheader for the card type exists in the column, if not, create it
                if (!columns[columnName].some(element => element.key === cardType)) {
                    columns[columnName].push(
                        <Typography key={cardType} sx={{ fontWeight: 'bold' }} variant="subtitle1" mb={1}>
                            {cardType} ({cardTypeCounts[cardType]})
                        </Typography>
                    );
                }

                const cardElement = (
                    <React.Fragment key={cardName}>
                        <Box key={index} display="flex" alignItems="center" justifyContent="space-between" sx={{ padding: '5px' }}>
                            <Typography
                                sx={{ width: '75%' }}
                                aria-owns={popoverOpen ? popoverId : undefined}
                                aria-haspopup="true"
                                onMouseEnter={(event) => handlePopoverOpen(cardName, event)}
                                onMouseLeave={handlePopoverClose}
                            >
                                {count} {cardName}
                            </Typography>
                            <div>
                                <IconButton aria-label="remove" onClick={() => dispatch(removeFromDeck(cardObject))} sx={{ width: '24px', height: '24px', borderRadius: '50%' }}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton aria-label="add" onClick={() => dispatch(addToDeck(cardObject))} sx={{ width: '24px', height: '24px', borderRadius: '50%' }}>
                                    <AddIcon />
                                </IconButton>
                            </div>
                        </Box>


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

                // Push the card element into the appropriate column
                columns[columnName].push(cardElement);
                // Increment the counter for the column
                columnCardCounts[columnName] += count;
            }
        });

        // Render each column
        return (
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                {Object.entries(columns).map(([columnName, cards], index) => (
                    <Stack key={index} sx={{ flexGrow: 1 }} direction="column">
                        <Typography
                            variant="h6"
                            mb={1}
                            sx={{
                                color: ['Dynasty', 'Fate'].includes(columnName) && columnCardCounts[columnName] < 40 ? 'red' : 'inherit'
                            }}
                        >
                            {columnName} {['Dynasty', 'Fate'].includes(columnName) && ` (${columnCardCounts[columnName]}/40)`}
                        </Typography>

                        {cards}
                    </Stack>
                ))}
            </Stack>
        );
    };
    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} centered variant="fullWidth">
                    <Tab
                        label="Deck"
                        sx={{
                            '&.Mui-selected': {
                                color: 'primary.main',
                                backgroundColor: 'background.paper',
                            },
                            '&:not(.Mui-selected)': {
                                color: 'text.secondary',
                                backgroundColor: 'background.default',
                            },
                        }}
                    />
                    <Tab
                        label="Analytics"
                        sx={{
                            '&.Mui-selected': {
                                color: 'primary.main',
                                backgroundColor: 'background.paper',
                            },
                            '&:not(.Mui-selected)': {
                                color: 'text.secondary',
                                backgroundColor: 'background.default',
                            },
                        }}
                    />
                </Tabs>
            </Box>

            {tabValue === 0 && (
                <Stack padding={4} direction="row" justifyContent="space-between">
                <Stack style={{ flex: 3 }} direction="column" mb={2} mr={8} sx={{marginRight: { xs: '0'}}} alignItems="center">
                    <Stack direction="row" justifyContent="space-between">
                        <DeckImporterButton/>
                        <DeckExporterButton legality={selectedLegality} />
                        <FormControl variant="standard" sx={{ minWidth: 120 }}>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={selectedLegality}
                                onChange={handleLegalityChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {legalities.map((legality, index) => (
                                    <MenuItem key={index} value={legality}>{legality}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    {currentDeck.length === 0 ? (
                        <Typography variant="body1">Your deck is empty.</Typography>
                    ) : (
                        <div>
                            {renderCardCounts()}
                        </div>
                    )}
                </Stack>
                <Stack sx={{ flex: 2, display: { xs: 'none', md: 'flex' } }} >
                    <ResultsView/>
                </Stack>
            </Stack>
            
            )}
            {tabValue === 1 && (
                <Stack>
                    <DeckAnalytics />
                    {/* <ResultsView /> */}
                </Stack>
            )}
        </>
    );
};

export default DeckBuilder;
