import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../css/bookmarkCard.css';

function BookmarkCard({ id }) {
    const [bookmarks, setFilmsBookmarks] = useState({});
    const [bookmarkss, setBookmarkss] = useState([]);

    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
        setFilmsBookmarks(storedBookmarks);

        const bookmarksArray = Object.keys(storedBookmarks)
            .filter(key => storedBookmarks[key] === true)
            .map(key => storedBookmarks[key]);

        setBookmarkss(bookmarksArray);
    }, []);

    return (
        <div className='CARD'>
            {bookmarkss.map((bookmark, index) => (
                <Card key={index} style={{ width: 345, height: 500 }} className='cardItem'>
                    <CardActionArea>
                        <React.Fragment>
                            <CardMedia
                                className='cardImg'
                                style={{ height: 400, width: 345 }}
                                component="img"
                                image={bookmark.posterUrl ? bookmark.posterUrl : null}
                            />

                            <CardContent className='cardContent'>
                                <Typography component="div">
                                    <p className='filmCreate'>{bookmark.year}</p>
                                    <h2 className='filmName'>{bookmark.name}</h2>
                                </Typography>
                            </CardContent>
                        </React.Fragment>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}

export default BookmarkCard;
