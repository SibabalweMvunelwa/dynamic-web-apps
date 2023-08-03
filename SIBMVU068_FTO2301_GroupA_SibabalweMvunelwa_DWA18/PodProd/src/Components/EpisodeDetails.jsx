/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import  FavoriteIcon from '@mui/icons-material/Favorite';
import { Accordion, AccordionDetails, AccordionSummary, Card, Container, List, ListItem, ListItemText, CardMedia, Button } from '@mui/material';
import Fuse from 'fuse.js'

const Details = ({handleCurrentEpisode, handleCurrentSeasonTitle, handleCurrentSeasonImage}) => {
  const [podcast, setPodcast] = useState(null);
  const [params, setParams] = useState(useParams())

// Redirect the user to the "/podcast" URL
    const navigate = useNavigate();
    const handleRedirectHome = () => {
          navigate('/')
          }

  const handlePlay = (episode, title, image) => {
    handleCurrentEpisode(episode);
    handleCurrentSeasonTitle(title);
    handleCurrentSeasonImage(image);
    if (episode !== null && typeof episode === 'object') {
        localStorage.setItem('currentEpisode', JSON.stringify(episode));
      } else {
        localStorage.setItem('currentEpisode', episode);
      };
    localStorage.setItem('currentSeasonTitle', title);
    localStorage.setItem('currentSeasonImage', image)
    localStorage.setItem('currentTime', 0);
    console.log(localStorage)
  }

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
        {/* Home button */}
        <Button variant="outlined" onClick={() => handleRedirectHome()}> Home </Button>
        
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
                    {/* Season card here with image and other available details */}
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
                            <ListItem key={episode.id} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <ListItemText primary={episode.title} secondary={"Episode: " + episode.episode} />
                                <Button variant="outlined" onClick={() => handlePlay(episode, season.title, season.image)}> Play </Button>
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