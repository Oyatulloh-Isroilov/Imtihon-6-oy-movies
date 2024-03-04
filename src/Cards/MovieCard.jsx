import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../css/movieCard.css'

function MovieCard({ id }) {
    const [movieBookmarks, setMovieBookmarks] = useState({});
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://api.kinopoisk.dev/v1.4/movie?lists=top250", {
            method: "GET",
            headers: {
                'X-API-KEY': "4CTJ829-0WD4E3R-GX46S2M-KGNYWCF"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.docs && data.docs.length > 0) {
                    setMovies(data.docs);
                }
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
        setMovieBookmarks(storedBookmarks);
    }, []);

    const handleBookmarkClick = (movieId) => {
        const newBookmarks = { ...movieBookmarks, [movieId]: !movieBookmarks[movieId] };
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        setMovieBookmarks(newBookmarks);
    };

    return (
        <div className='CARD'>
            {movies.map(movie => (
                <Card key={movie.id} style={{ width: 345 }} className='cardItem'>
                    <CardActionArea>
                        <React.Fragment>
                            <CardMedia className='cardImg' style={{ height: 450, width: 345 }} component="img" image={movie.poster.url} />

                            <img
                                onClick={() => handleBookmarkClick(movie.id)}
                                className={`bookmark1 ${movieBookmarks[movie.id] ? 'active' : ''}`}
                                src={movieBookmarks[movie.id] ? "./bookmarkActive.svg" : "bookmark.svg"}
                                alt="Bookmark"
                            />
                            <CardContent className='cardContent'>
                                <Typography component="div">
                                    <p className='filmCreate'>{movie.year}</p>
                                    <h2 className='filmName'>{movie.name}</h2>
                                </Typography>
                            </CardContent>
                        </React.Fragment>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}

export default MovieCard;
