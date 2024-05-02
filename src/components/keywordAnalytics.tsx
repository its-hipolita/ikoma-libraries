import React from 'react';
import { Box, Typography } from '@mui/material';

const KeywordAnalytics: React.FC<{ analytics: { [key: string]: { [key: string]: number } } }> = ({ analytics }) => {
    return (
        <Box mb={4}>
            <Typography variant="h5">Keyword Analytics</Typography>
            {Object.entries(analytics).map(([type, keywordCounts]) => (
                <div key={type}>
                    <Typography variant="h6">{type}</Typography>
                    <ul>
                        {Object.entries(keywordCounts).map(([keyword, count]) => (
                            <li key={keyword}>
                                {keyword && (
                                    <div style={{ display: 'inline-block' }}>
                                        <span>{keyword}</span>: {count}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </Box>
    );
};

export default KeywordAnalytics;
