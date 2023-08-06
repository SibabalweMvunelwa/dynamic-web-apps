import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { House } from '@mui/icons-material';
import { supabase } from '../supabaseClient';
import { Card, Container, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import FavouritesItem from './FavouritesItem';

const Favourites = ({session}) => {
    const navigate = useNavigate();
    const handleRedirectHome = () => {
          navigate('/')
    }
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [titleSort, setTitleSort] = useState('');

    async function fetchFavourites() {
        let {data, error} = await supabase
        .from('Favourites')
        .select('*')
        .order('episode_id', 'desc')
        .eq('user_id', session.user.id)
        setData(data);
    }

    const handleTitleSortChange = (event) => {
        if (event.target.value == 1) {
            setData(data.sort((a, b) => {
                return a.title.localeCompare(b.title)
            }))
        }
        if (event.target.value == 2) {
            setData(data.sort((a, b) => b.title.localeCompare(a.title)))
        }
        setTitleSort(event.target.value);
    }

    useEffect(() => {
        if (data.length == 0) {
            fetchFavourites();
        }
    }, [data])
    return (
        <Container maxWidth="md" sx={{marginBottom: '100%'}}>
            {/* Home button */}
            <IconButton sx={{border: '1pt solid grey'}} aria-label='Home' size='large' onClick={() => handleRedirectHome()}>
              <House fontSize='large'></House>
            </IconButton>
            <h2>Favourites</h2>
            <Card>
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
            </Card>
            <Card>
            <div>
                {data.map(item => (
                    <FavouritesItem data={item} session={session}></FavouritesItem>
                ))}
            </div>
            </Card>
        </Container> 
    )
}



export default Favourites