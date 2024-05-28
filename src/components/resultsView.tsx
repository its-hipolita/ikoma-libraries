import React, { useState, useEffect } from 'react';
import CardGallery from './cardGallery';
import { Card } from '../app/types';
import { fetchXmlData } from '../services/xmlservice';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import axios from 'axios';

const ResultsView: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Card[]>([]);

    const searchOptions = useSelector((state: RootState) => state.search);

    useEffect(() => {
// Make a GET request to the backend server
axios.get('http://localhost:3000')
  .then(response => {
    console.log('Response from backend:', response.data);
  })
  .catch(error => {
    console.error('Error communicating with backend:', error);
  });
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const xmlData = await fetchXmlData(searchOptions); // Pass searchTerm to fetchXmlData
                setData(xmlData);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };
        const searchTerm = '';
        // Fetch data only if searchTerm is not empty
        if (searchOptions) {
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
            <CardGallery cards={data} />
    );
};

export default ResultsView;
