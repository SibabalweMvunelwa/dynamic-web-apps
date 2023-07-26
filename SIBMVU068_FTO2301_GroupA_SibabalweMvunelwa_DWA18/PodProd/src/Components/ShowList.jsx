import React from 'react';

const List = ({ podcasts }) => {
  return (
    <div>
      <h2>Podcasts</h2>
      <ul>
        {podcasts.map(podcast => (
          <li key={podcast.id}>{podcast.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;