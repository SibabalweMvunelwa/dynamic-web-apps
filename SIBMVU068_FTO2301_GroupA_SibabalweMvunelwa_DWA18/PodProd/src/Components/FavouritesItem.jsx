import React, { useState, useEffect } from 'react';
import { Card, CardMedia, Box, CardContent, Typography, IconButton, } from '@mui/material';
import axios from 'axios';
import { RemoveCircle } from '@mui/icons-material';
import { supabase } from '../supabaseClient';

const FavouritesItem= ({data, session}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [favourite, setFavourite] = useState(null);
    const handleRemoveFavourite = async (favourite) => {
        // reconstruct id
        let id = favourite.podcast.id + '__' + favourite.season + '__' + favourite.episode;
        let {error} = await supabase.from('Favourites')
        .delete().eq('user_id', session.user.id).eq('episode_id', id)
        alert('Favourite Deleted. Please refresh the page.')
    }
    useEffect(() => {
        if (!favourite && isLoading == false) {
            setIsLoading(true);
            // deconstruct the episode id
            let split = data.episode_id.split('__')
            // fetch the full podcast
            axios.get(`https://podcast-api.netlify.app/id/${split[0]}`)
            .then(response => {
                let data = response.data;
                console.log(response.data);
                setFavourite({
                    podcast: data,
                    season: split[1],
                    episode: split[2]
                })
                setIsLoading(false);
            })
        }
    }, [])
        return (
        <Card key={favourite ? favourite.podcast.id : 1} sx={{ display: 'flex', minWidth: '40%' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={ favourite ? favourite.podcast.image : "" }
                alt="podcast image"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    { favourite ? favourite.podcast.title : "Loading" }
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Seasons: { favourite ? favourite.season : "Loading" }
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Episode: { favourite ? favourite.episode : "Loading"}
                </Typography>
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => handleRemoveFavourite(favourite)}>
                    <RemoveCircle></RemoveCircle>
                </IconButton>
            </Box>
        </Card>
        )
}



export default FavouritesItem