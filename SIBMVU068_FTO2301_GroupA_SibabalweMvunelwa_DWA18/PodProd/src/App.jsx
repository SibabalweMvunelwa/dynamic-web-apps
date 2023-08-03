/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './Components/ShowList';
import Details from './Components/EpisodeDetails';
import axios from 'axios';
import Player from './Components/Player';
import './App.css';
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import { LinearProgress, Container, Box, CircularProgress } from '@mui/material';

const App = () => {

  const isValidJson = (string) => {
    if (typeof string != 'string') {
      return false;
    }
    try {
      JSON.parse(string);
      return true;
    } catch (error) {
        return false;
    }
  }

  if (!isValidJson(localStorage.getItem('currentEpisode'))) {
    localStorage.clear();
  }

  const [podcasts, setPodcasts] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(localStorage.getItem('currentEpisode') ?  (JSON.parse(localStorage.getItem('currentEpisode'))) : null);
  const [currentSeasonTitle, setCurrentSeasonTitle] = useState(localStorage.getItem('currentSeasonTitle') ?? null);
  const [currentSeasonImage, setCurrentSeasonImage] = useState(localStorage.getItem('currentSeasonImage') ?? null);
  const [isLoading, setIsLoading] = useState(false);

  
  
  const handleCurrentSeasonImage = (image) => {
    setCurrentSeasonImage(image)
  }

  const handleCurrentEpisode = (episode) => {
    setCurrentEpisode(episode)
  }

  const handleCurrentSeasonTitle = (title) => {
    setCurrentSeasonTitle(title)
  }

// Supabase 
  const [session, setSession] = useState(null)

// Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  useEffect(() => {
    setIsLoading(true);
    // Fetch data from the API endpoint
    axios.get('https://podcast-api.netlify.app/shows')
      .then(response => {
        setPodcasts(response.data)
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>LOADING...</p>
        <LinearProgress />
      </div>
    )
  } else {
    return (
      <div>
        {/* Supabase
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />} */}
      {/* </div> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<List podcasts={podcasts} setPodcasts={setPodcasts}></List>} />
          <Route path="/podcast/:id" 
                element={
                          <Details handleCurrentEpisode={handleCurrentEpisode} 
                                  handleCurrentSeasonTitle={handleCurrentSeasonTitle}
                                  handleCurrentSeasonImage={handleCurrentSeasonImage}
                                  >
                          </Details>
                          } />
        </Routes>
      </BrowserRouter>
      {/* // Podcast Player goes here, as it needs to persist regardless of route */}
      <Player currentEpisode={currentEpisode}
              currentSeasonTitle={currentSeasonTitle}
              currentSeasonImage={currentSeasonImage}>
      </Player>
      </div>
    );
  }
};


export default App;