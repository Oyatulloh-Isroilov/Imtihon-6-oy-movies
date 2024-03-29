import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../css/tvSeriesCard.css'

function TvSeriesCard() {
    const [tvSeriesBookmarks, setTvSeriesBookmarks] = useState({});
    const [tvSeries, setTvSeries] = useState([]);

    useEffect(() => {
        fetch("https://api.kinopoisk.dev/v1.4/movie?type=tv-series", {
            method: "GET",
            headers: {
                'X-API-KEY': "4CTJ829-0WD4E3R-GX46S2M-KGNYWCF"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.docs && data.docs.length > 0) {
                    setTvSeries(data.docs);
                }
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
        setTvSeriesBookmarks(storedBookmarks);
    }, []);

    const handleBookmarkClick = (tvSeriesId) => {
        const newBookmarks = { ...tvSeriesBookmarks, [tvSeriesId]: !tvSeriesBookmarks[tvSeriesId] };
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        setTvSeriesBookmarks(newBookmarks);
    };

    return (
        <div className='CARD'>
            {tvSeries.map(tvSeries => (
                <Card key={tvSeries.id} style={{ height: 600, width: 345 }} className='cardItem'>
                    <CardActionArea>
                        <React.Fragment>
                            <CardMedia className='cardImg' style={{ height: 550, width: 365 }} component="img" image={tvSeries.backdrop.previewUrl} />
                            <CardContent className='cardContent'>
                                <Typography component="div">
                                    <p className='filmCreate'>{tvSeries.year}</p>
                                    <h2 className='filmName'>{tvSeries.alternativeName}</h2>
                                </Typography>
                            </CardContent>
                            <img onClick={() => handleBookmarkClick(tvSeries.id)} className={`bookmark1 ${tvSeriesBookmarks[tvSeries.id] ? 'active' : ''}`} src={tvSeriesBookmarks[tvSeries.id] ? "./bookmarkActive.svg" : "./bookmark.svg"} alt="Bookmark" />
                        </React.Fragment>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}

export default TvSeriesCard;
