// FilmsCard.js
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../css/card.css';

function FilmsCard({ id }) {
    const [filmsBookmarks, setFilmsBookmarks] = useState({});
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetch("https://api.kinopoisk.dev/v1.4/movie?lists=!top250", {
            method: "GET",
            headers: {
                'X-API-KEY': "4CTJ829-0WD4E3R-GX46S2M-KGNYWCF"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.docs && data.docs.length > 0) {
                    setFilms(data.docs);
                }
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
        setFilmsBookmarks(storedBookmarks);
    }, []);

    const handleBookmarkClick = (filmId) => {
        const newBookmarks = { ...filmsBookmarks, [filmId]: !filmsBookmarks[filmId] };
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        setFilmsBookmarks(newBookmarks);
    };

    return (
        <div className='CARD'>
            {films.map(film => (
                <Card key={film.id} style={{ height: 600, width: 345 }} className='cardItem'>
                    <CardActionArea>
                        <React.Fragment>
                            <CardMedia
                                className='cardImg'
                                style={{ height: 550, width: 345 }}
                                component="img"
                                image={film.poster.url}
                            />
                            <img
                                onClick={() => handleBookmarkClick(film.id)}
                                className={`bookmark1 ${filmsBookmarks[film.id] ? 'active' : ''}`}
                                src={filmsBookmarks[film.id] ? "./bookmarkActive.svg" : "bookmark.svg"}
                                alt="Bookmark"
                            />
                            <CardContent className='cardContent'>
                                <Typography component="div">
                                    <p className='filmCreate'>{film.year}</p>
                                    <h2 className='filmName'>{film.name}</h2>
                                </Typography>
                            </CardContent>
                        </React.Fragment>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}

export default FilmsCard;
