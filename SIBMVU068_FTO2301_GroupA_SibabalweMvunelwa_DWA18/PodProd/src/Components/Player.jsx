/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Fab, Box, CardMedia, Card, CardContent, Typography } from '@mui/material';

const Player = ({currentEpisode, currentSeasonTitle, currentSeasonImage}) => {
  const [audioRef, setAudioRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [episodeDuration, setEpisodeDuration] = useState(null);
  const [audioSrc, setAudioSrc] = useState("");
  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

  useEffect(() => {
    handleEpisodeChange();
    if (audioRef) {
      setEpisodeDuration(formatTime(audioRef.duration))
    }
  }, [currentEpisode, audioRef])

// Funtion to format the time into minutes and seconds
  const formatTime = (time) => {
    if (time) {
      const minutes = Math.floor(time / 60);
      const remainingSeconds = Math.round(time % 60);
      
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

      return `${formattedMinutes}:${formattedSeconds}`
    }
    return '00:00'
  }

  useEffect(() => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.play();
      } else {
        audioRef.pause();
      }
    }
  }, [isPlaying, audioRef]);



  const handlePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handleEpisodeChange = () => {
    if (audioRef) {
      // first, set time to 0 on audio
      audioRef.currentTime = 0;
      // check local storage if currentTime is saved and isnt null
      const time = localStorage.getItem('currentTime') ? parseFloat(localStorage.getItem('currentTime')) : null
        // if time isnt null, and it isnt 0 (new episode)
      if (time && time != 0) {
        // set the audio element to saved current time
        audioRef.currentTime = time;
      }
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.currentTime);
    // if the rounded down current time is cleanly divisible by 10, save the current time.
    if (Math.floor(audioRef.currentTime) % 10 == 0) {
      localStorage.setItem('currentTime', audioRef.currentTime)
    }

  };

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <SkipPrevious/>
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={handlePlayback}
          >
            { isPlaying ? <Pause/> : < PlayArrow/>}
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            sx={{ mr: 2 }}
          >
            < SkipNext/>
          </IconButton>
          <Typography>
            { formatTime(currentTime) } / {audioRef ? formatTime(audioRef.duration) : null }
          </Typography>
            {/* Audio Player goes here */}
             {/* <div>
      <h3>{episode.title}</h3>
      <button onClick={handlePlayback}>{isPlaying ? 'Pause' : 'Play'}</button>
      <p>Current Time: {currentTime.toFixed(2)} seconds</p>
    </div>  */}
            <Card sx={{ mr: 2, flexGrow: 1 }}>
              <audio
                ref={(element) => setAudioRef(element)}
                src={currentEpisode.file}
                onTimeUpdate={handleTimeUpdate}
                // onEnded={handleSaveProgress}
                >
                </audio>
            </Card>
            <Card
              sx={{ display: "flex", flexDirection: "row"}}
            >
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={currentSeasonImage}
                alt=""
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    { currentEpisode ? currentEpisode.title : "" }
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Episode: { currentEpisode ? currentEpisode.episode : "" } | {currentSeasonTitle}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
        </Toolbar>
      </AppBar>
  );
};

export default Player;