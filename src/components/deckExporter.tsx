import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Typography, TextareaAutosize } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { buildSNMText } from '../services/deckExport';

interface DeckExporterButtonProps {
    legality: string; // Define the prop 'legality' as a string
}

const DeckExporterButton: React.FC<DeckExporterButtonProps> = ( legality ) => {
    const [open, setOpen] = useState(false);
    const [deckText, setDeckText] = useState('');
    const dispatch = useDispatch();

    const currentDeck = useSelector((state: RootState) => state.deck.currentDeck);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleExportDeck = async () => {
        const exportedText:string = buildSNMText(currentDeck, legality.legality);
        setDeckText(exportedText);
    };

    useEffect(() => {
        handleExportDeck();
    }, [currentDeck, legality]);

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>Export Deck</Button>
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
                        Paste this into a .txt file
                    </Typography>
                    <TextareaAutosize
                        aria-label="deck-text"
                        minRows={20}
                        placeholder="Paste your deck here..."
                        value={deckText}
                        style={{ width: '100%', resize: 'vertical' }}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default DeckExporterButton;
