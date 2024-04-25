import React, { useState, useEffect } from 'react';
import CardGallery from './cardGallery';
import { Card } from '../app/types';
import { fetchXmlData } from '../services/xmlservice';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ResultsView: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Card[]>([]);

    const searchOptions = useSelector((state: RootState) => state.search);
    console.log('Search Options:', searchOptions);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const xmlData = await fetchXmlData('Hida'); // Pass searchTerm to fetchXmlData
                setData(xmlData);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };
        const searchTerm = 'hida';
        // Fetch data only if searchTerm is not empty
        if (searchTerm) {
            fetchData();
        } else {
            // Reset data if searchTerm is empty
            setData([]);
            setLoading(false);
            setError(null);
        }
    }, [searchOptions]); // Watch for changes in searchTerm

    if (loading) {
        return <p>Loading XML data...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <CardGallery cards={data} />
        </div>
    );
};

export default ResultsView;
