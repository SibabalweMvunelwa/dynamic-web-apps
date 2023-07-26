import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Details = () => {
  const [podcast, setPodcast] = useState(null);
  const [params, setParams] = useState(useParams())
  useEffect(() => {
    // Fetch data for a single podcast using the show's ID from the URL parameter
    console.log(params)
    axios.get(`https://podcast-api.netlify.app/id/${params.id}`)
      .then(response => setPodcast(response.data))
      .catch(error => console.error(error));
  }, [params.id]);

  if (!podcast) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{podcast.title}</h2>
      <h3>Seasons:</h3>
    </div>
  );
};

export default Details;
