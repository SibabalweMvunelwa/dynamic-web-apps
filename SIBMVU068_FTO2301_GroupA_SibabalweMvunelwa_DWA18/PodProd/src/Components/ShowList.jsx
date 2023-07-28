/* eslint-disable */

import { ArrowForwardIos } from '@mui/icons-material';
import { Card, Container, CardContent, Typography, CardMedia, Box, CardActionArea, IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const List = ({ podcasts }) => {
    let navigate = useNavigate();
    const handleClick = (id) => {
        // Redirect the user to the "/podcast" URL
        navigate('/podcast/'+id)
      };
  return (
    /* Created Cards using mui syntax.
    
    ChatGPT was outdated, had to find updated syntax
    using React Router + mui library.
    
    Made handleClick a function
    */
    <Container maxWidth="md">
      <h2>Podcasts</h2>
        {podcasts.map(podcast => (
          <Card key={podcast.id} sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={ podcast.image }
                alt="podcast image"
            />
            <CardActionArea sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} onClick={() => handleClick(podcast.id)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    { podcast.title }
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Seasons: { podcast.seasons }
                </Typography>
                </CardContent>
            </Box>
            <Box>
                <IconButton>
                    <ArrowForwardIos></ArrowForwardIos>
                </IconButton>
            </Box>
            </CardActionArea>

        </Card>
        ))}
    </Container>
  );
};

export default List;
