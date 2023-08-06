/* eslint-disable */


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import  FavoriteIcon from '@mui/icons-material/Favorite';
import { Accordion, AccordionDetails, AccordionSummary, Card, Container, List, ListItem, ListItemText, CardMedia, Button, IconButton } from '@mui/material';
import { House } from '@mui/icons-material';
import { supabase } from '../supabaseClient';

const Details = ({handleCurrentEpisode, handleCurrentSeasonTitle, handleCurrentSeasonImage, session}) => {
  const [podcast, setPodcast] = useState(null);
  const [params, setParams] = useState(useParams())
  const [isLoading, setIsLoading] = useState(false)

// Redirect the user to the "/podcast" URL
  const navigate = useNavigate();
  const handleRedirectHome = () => {
        navigate('/')
  }
  const handleRedirectFav = () => {
        navigate('/favourites')
  }
  const formatDate = (date) => {
    let formatted = new Date(date);
    return formatted.toLocaleString();
  }
  
  const handleSaveFav = async (episode, season) => {
    // get required data - episode id + user id
    const episodeId = podcast.id + '__' + season + '__' + episode;
    const userId = session.user.id;
    // send to supabase
    const { data, error } = await supabase
      .from('Favourites')
      .insert({
        episode_id: episodeId,
        user_id: userId,
        podcast_title: podcast.title
      })
      .select('*')

  }
  const handlePlay = (episode, title, image) => {
    handleCurrentEpisode(episode);
    handleCurrentSeasonTitle(title);
    handleCurrentSeasonImage(image);
    localStorage.setItem('currentEpisode', JSON.stringify(episode));
    localStorage.setItem('currentSeasonTitle', title);
    localStorage.setItem('currentSeasonImage', image)
    localStorage.setItem('currentTime', 0);
  }

  useEffect(() => {
    console.log('loading')
    setIsLoading(true);
    // Fetch data for a single podcast using the show's ID from the URL parameter
    axios.get(`https://podcast-api.netlify.app/id/${params.id}`)
      .then(response => {
        setIsLoading(false)
        setPodcast(response.data)
      })
      .catch(error => {
        setIsLoading(false)
        console.error(error)
      });
  }, [params.id]);

  if (!podcast || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" sx={{marginBottom: '50%'}}>
        {/* Home button */}
        <IconButton sx={{border: '1pt solid grey'}} aria-label='Home' size='large' onClick={() => handleRedirectHome()}>
          <House fontSize='large'></House>
        </IconButton>
        <IconButton sx={{border: '1pt solid grey'}} aria-label='Favourite' size='large' onClick={() => handleRedirectFav()}>
          <FavoriteIcon fontSize='large'></FavoriteIcon>
        </IconButton>
        {/* <Button variant="outlined" onClick={() => handleRedirectHome()}> Home </Button> */}

        <Card
        sx = {{ marginTop: '10%'}}>
          <CardMedia
                  component="img"
                  sx={{
                        margin: 'auto', 
                        width: '50%', 
                      }}
                  image={ podcast.image }
                  alt="podcast image" 
              /> 
          <h2>{podcast.title}</h2>
          <h3>Seasons: {podcast.seasons.length}</h3>
      
          <h3>{podcast.description}</h3>
          <h3>Genres: {podcast.hasOwnProperty('genres') && podcast.genres.length > 0 ? podcast.genres.join(", ") : 'No Genres'}</h3>
          <h3>Last update: {formatDate(podcast.updated)}</h3>
          
          <div>
              {podcast.seasons.map(season => (
                  <Accordion>
                      <AccordionSummary>
                          Season { season.season }
                      </AccordionSummary>
                      <AccordionDetails>
                      <Card>
                        <CardMedia
                          component="img"
                          sx={{
                                margin: 'auto', 
                                width: '50%', 
                              }}
                          image={ season.image }
                          alt="season image" 
                        /> 
                        <h2>{season.title}</h2>
                        <h3>Episodes: {season.episodes.length}</h3>
                      </Card>
                      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                          {season.episodes.map(episode => (
                              <ListItem key={episode.id} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%'}}>
                                  <ListItemText primary={episode.title} secondary={"Episode: " + episode.episode} />
                                  <Button variant="outlined" onClick={() => handlePlay(episode, season.title, season.image)}> Play </Button>
                                  <Button variant="outlined" onClick={() => handleSaveFav(episode.episode, season.season)}>{ <FavoriteIcon /> } </Button>
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