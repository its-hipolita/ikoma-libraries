import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextareaAutosize } from '@mui/material';
import { useDispatch } from 'react-redux';
const DeckAnalytics: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [deckText, setDeckText] = useState('');
    const dispatch = useDispatch();

 
    return (
        <>
            <Box>Hello world</Box>
        </>
    );
};

export default DeckAnalytics;
