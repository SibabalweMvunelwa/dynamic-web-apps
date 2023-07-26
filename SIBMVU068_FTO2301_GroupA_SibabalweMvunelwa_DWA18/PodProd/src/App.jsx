import React, { useEffect, useState } from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './Components/ShowList';
import Details from './Components/EpisodeDetails';
import axios from 'axios';


import './App.css';

const App = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {

    // Fetch data from the API endpoint
    axios.get('https://podcast-api.netlify.app/shows')
      .then(response => setPodcasts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<List podcasts={podcasts}></List>} />
        <Route path="/podcast/:id" element={<Details></Details>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

