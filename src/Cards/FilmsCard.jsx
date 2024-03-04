import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../css/card.css'

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

    const handleBookmarkClick = (filmsId) => {
        const newBookmarks = { ...filmsBookmarks, [filmsId]: !filmsBookmarks[filmsId] };
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        setFilmsBookmarks(newBookmarks);
    };

    return (
        <div className='CARD'>
            {films.map(films => (
                <Card key={films.id} style={{ width: 345, height: 500 }} className='cardItem'>
                    <CardActionArea>
                        <React.Fragment>
                            <CardMedia className='cardImg' style={{ height: 400, width: 345 }} component="img" image={films.poster.url} />

                            <img
                                onClick={() => handleBookmarkClick(films.id)}
                                className={`bookmark1 ${filmsBookmarks[films.id] ? 'active' : ''}`}
                                src={filmsBookmarks[films.id] ? "./bookmarkActive.svg" : "bookmark.svg"}
                                alt="Bookmark"
                            />
                            <CardContent className='cardContent'>
                                <Typography component="div">
                                    <p className='filmCreate'>{films.year}</p>
                                    <h2 className='filmName'>{films.name}</h2>
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
