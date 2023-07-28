import React, { useEffect, useState } from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './Components/ShowList';
import Details from './Components/EpisodeDetails';
import axios from 'axios';
import Player from './Components/Player';
import './App.css';

const App = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(localStorage.getItem('currentEpisode') ? /*JSON.parse*/ (localStorage.getItem('currentEpisode')) : null);
  const [currentSeasonTitle, setCurrentSeasonTitle] = useState(localStorage.getItem('currentSeasonTitle') ?? null);
  const [currentSeasonImage, setCurrentSeasonImage] = useState(localStorage.getItem('currentSeasonImage') ?? null);
  
  const handleCurrentSeasonImage = (image) => {
    setCurrentSeasonImage(image)
  }

  const handleCurrentEpisode = (episode) => {
    setCurrentEpisode(episode)
  }

  const handleCurrentSeasonTitle = (title) => {
    setCurrentSeasonTitle(title)
  }

  useEffect(() => {
    // Fetch data from the API endpoint
    axios.get('https://podcast-api.netlify.app/shows')
      .then(response => setPodcasts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<List podcasts={podcasts}></List>} />
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
};


export default App;

