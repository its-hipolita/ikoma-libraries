import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextareaAutosize } from '@mui/material';
import buildDeckFromDecklistAndXML from '../services/deckImport';
import { useDispatch } from 'react-redux';
import { addToDeck, importDeck } from '../app/store';
import { Card } from '../app/types';



const DeckImporterButton: React.FC = (columns:any) => {
    const [open, setOpen] = useState(false);
    const [deckText, setDeckText] = useState('');
    const dispatch = useDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDeckText(event.target.value);
    };

    const handleImportDeck = async () => {
        try {
            const importedDeck: Card[] = await fetchAndBuildDeck(deckText);
            dispatch(importDeck(importedDeck));
            handleClose();
        } catch (error) {
            console.error('Error importing deck:', error);
            // Handle error as needed
        }
    };

    const fetchAndBuildDeck = async (deckText: string): Promise<Card[]> => {
        try {
            const importedDeck: Card[] = await buildDeckFromDecklistAndXML(deckText);
            return importedDeck;
        } catch (error) {
            console.error('Error building deck:', error);
            throw error; // Re-throw the error to handle it in the calling function
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>Import Deck</Button>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        minWidth: '50%',
                        maxWidth: '80%',
                        minHeight: '50%',
                        maxHeight: '80%',
                        overflowY: 'auto',
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Paste your deck below:
                    </Typography>
                    <TextareaAutosize
                        aria-label="deck-text"
                        minRows={20}
                        placeholder="Paste your deck here..."
                        value={deckText}
                        onChange={handleTextAreaChange}
                        style={{ width: '100%', resize: 'vertical' }}
                    />
                    <Button variant="contained" onClick={handleImportDeck} sx={{ mt: 2 }}>
                        Import Deck
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default DeckImporterButton;
