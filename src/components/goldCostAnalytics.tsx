import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const GoldCostAnalytics: React.FC<{ goldCostData: any[], analytics: { [key: string]: { [key: string]: number } } }> = ({ goldCostData, analytics }) => {
    // Function to get color based on index
    const getColor = (index: number) => {
        const colors = ['#82ca9d', '#8884d8', '#ffc658', '#ff5733', '#c70039', '#900c3f', '#581845', '#008080', '#800080', '#000080']; // Additional colors added
        return colors[index % colors.length];
    };

    return (
        <Box>
            <Typography variant="h5">Gold Cost Distribution</Typography>
            <BarChart width={600} height={400} data={goldCostData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cost" interval={0} />
                <YAxis interval={0} />
                <Tooltip />
                <Legend />
                {Object.keys(analytics).map((type, index) => (
                    <Bar key={type} dataKey={type} stackId="a" fill={getColor(index)} />
                ))}
            </BarChart>
        </Box>
    );
};

export default GoldCostAnalytics;