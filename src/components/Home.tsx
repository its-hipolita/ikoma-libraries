import React from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ResultsView from './resultsView';


const Container = styled(Box)({
  display: 'flex',
  width: '100%',
  height: 'auto',
  paddingTop: '80px',
});

const Content = styled(Box)({
  overflowY: 'auto', 
  flex: 1,
  padding: '20px',
});

const Home = () => {
    
  return (
    <Container>
      <Content>
        <ResultsView />
      </Content>
    </Container>
  );
};

export default Home;
