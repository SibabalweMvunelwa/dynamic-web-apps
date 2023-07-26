import React from 'react';

const Player = ({ episode }) => {
  return (
    <div>
      <h3>{episode.title}</h3>
      <audio controls>
        <source src={episode.audio} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default Player;