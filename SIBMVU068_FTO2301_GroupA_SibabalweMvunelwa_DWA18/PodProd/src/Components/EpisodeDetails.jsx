/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import  FavoriteIcon from '@mui/icons-material/Favorite';
import { Accordion, AccordionDetails, AccordionSummary, Card, Container, List, ListItem, ListItemText, CardContent, Typography, CardMedia, Box, CardActionArea, IconButton, Button } from '@mui/material';

const redirectHome = () => {
        let navigate = useNavigate();
        const handleClick = () => {
            // Redirect the user to the "/podcast" URL
            navigate('/')
          };
}

const Details = () => {
  const [podcast, setPodcast] = useState(null);
  const [params, setParams] = useState(useParams())
  useEffect(() => {
    // Fetch data for a single podcast using the show's ID from the URL parameter
    axios.get(`https://podcast-api.netlify.app/id/${params.id}`)
      .then(response => setPodcast(response.data))
      .catch(error => console.error(error));
  }, [params.id]);

  if (!podcast) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
        {/* Add Home button */}
        <Button variant="outlined" onClick={() => }> Home </Button>
        <Card>
        <CardMedia
                component="img"
                sx={{ 
                      width: '50%', 
                      display: 'flex' ,
                      flexDirection: 'column' ,
                      alignItems: 'center' ,
                      justifyContent: 'center' 
                    }}
                image={ podcast.image }
                alt="podcast image" 
            /> 
        <h2>{podcast.title}</h2>
        <h3>Seasons: {podcast.seasons.length}</h3>
        {/* Add all podcast details here (description, image etc) */}
        <h3>{podcast.description}</h3>
        <h3>{podcast.genres.join(", ")}</h3>
        <h3>Last update: {podcast.updated}</h3>
        <div>
            {podcast.seasons.map(season => (
                <Accordion>
                    <AccordionSummary>
                        Season { season.season }
                    </AccordionSummary>
                    <AccordionDetails>
                    {/* Add card here with image and other available details */}
                    <Card>
                    {/* <CardMedia
                            component="img"
                            sx={{ 
                                  width: '50%', 
                                  display: 'flex' ,
                                  flexDirection: 'column' ,
                                  alignItems: 'center' ,
                                  justifyContent: 'center' 
                                }}
                            image={ season.image }
                            alt="Season image" 
                        />  */}
                    <h2>{season.title}</h2>
                    <h3>Episodes: {season.episode}</h3>
                    </Card>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {season.episodes.map(episode => (
                            <ListItem sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <ListItemText primary={episode.title} secondary={"Episode: " + episode.episode} />
                                <Button variant="outlined" > Play </Button>
                                <Button variant="outlined" >{ <FavoriteIcon /> } </Button>
                            </ListItem>
                        ))}
                    </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
        </Card>
    </Container>
  );
};

export default Details;