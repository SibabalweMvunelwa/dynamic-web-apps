/* eslint-disable */

import { ArrowForwardIos } from '@mui/icons-material';
import { Card, Container, CardContent, Typography, CardMedia, Box, CardActionArea, IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

const List = ({ podcasts, setPodcasts }) => {
    const [titleFilter, setTitleFilter] = useState('');
    const [titleSort, setTitleSort] = useState('');
    const [dateSort, setDateSort] = useState('');
    const [allPodcasts, setAllPodcasts] = useState(podcasts);
    
    let navigate = useNavigate();
    const handleClick = (id) => {
        // Redirect the user to the "/podcast" URL
        navigate('/podcast/'+id)
    };
    const fuseOptions = {
        isCaseSensitive: false,
            minMatchCharLength: 1,
        keys: [
            "title",
        ]
    };

    const handleFuzzySearch = (event) => {
        setTitleFilter(event.target.value);
        const fuse = new Fuse(allPodcasts, fuseOptions);
        if (event.target.value.length > 0) {
            let result = fuse.search(event.target.value);
            setPodcasts(result.map((v) => {
                return v.item
            }))
        } else {
            setPodcasts(allPodcasts);
        }
    }

    const handleTitleSortChange = (event) => {
        if (event.target.value == 1) {
            setPodcasts(podcasts.sort((a, b) => {
                return a.title.localeCompare(b.title)
            }))
        }
        if (event.target.value == 2) {
            setPodcasts(podcasts.sort((a, b) => b.title.localeCompare(a.title)))
        }
        setTitleSort(event.target.value);
    }
    const handleDateSortChange = (event) => {
        if (event.target.value == 1) {
            setPodcasts(podcasts.sort((a, b) => {
                let first = new Date(a.updated);
                let sec = new Date(b.updated);
                let result = first.getTime() > sec.getTime()
                return result ? 1 : -1
            }))
        }
        if (event.target.value == 2) {
            setPodcasts(podcasts.sort((a, b) => {
                let first = new Date(b.updated);
                let sec = new Date(a.updated);
                let result = first.getTime() > sec.getTime()
                return result ? 1 : -1
            }))
        }
        setDateSort(event.target.value);
    }
  return (
    /* Created Cards using mui syntax.
    
    ChatGPT was outdated, had to find updated syntax
    using React Router + mui library.
    
    Made handleClick a function
    */
    <Container maxWidth="md">
      <h2>Podcasts</h2>
      {/* Filters */}
      <Card sx={{ display: 'flex', flexDirection: 'row', width:'100%'}}>
        {/* Title Fuzzy Search */}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField onChange={handleFuzzySearch} value={titleFilter} id="titleFilterField" label="Podcast Title" variant="standard" />
        </FormControl>
        {/* ASC/DESC Title */}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="title-sort-label">Title</InputLabel>
            <Select 
            value={titleSort}
            labelId='title-sort-label'
            onChange={handleTitleSortChange}>
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Asc</MenuItem>
                <MenuItem value={2}>Desc</MenuItem>
            </Select>
        </FormControl>
        {/* ASC/DESC updated date */}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='date-sort-label'>Last Updated</InputLabel>
            <Select 
             value={dateSort}
             labelId='date-sort-label'
             onChange={handleDateSortChange}
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Asc</MenuItem>
                <MenuItem value={2}>Desc</MenuItem>
            </Select>
        </FormControl>
      </Card>
      {/* Genre Tag Cloud */}
      <Card>
        {genres.map(genre => {
            <Chip label={genre.label} onClick={handleGenreSelect(genre.value)} />
        })}
      </Card>
        {podcasts.map(podcast => (
          <Card key={podcast.id} sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={ podcast.image }
                alt="podcast image"
            />
            <CardActionArea sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} onClick={() => handleClick(podcast.id)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    { podcast.title }
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Seasons: { podcast.seasons }
                </Typography>
                </CardContent>
            </Box>
            <Box>
                <IconButton>
                    <ArrowForwardIos></ArrowForwardIos>
                </IconButton>
            </Box>
            </CardActionArea>

        </Card>
        ))}
    </Container>
  );
};

export default List;