import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../css/home.css'
import BookmarkCard from '../Cards/BookmarkCard';

function Bookmark() {
    const [cardIds, setCardIds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const generateGUID = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = (Math.random() * 16) | 0,
                    v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        };

        const ids = Array.from({ length: 1 }, () => generateGUID());
        setCardIds(ids);
    }, []);

    const handleAllFilmsClick = () => {
        window.location.href = "/";
    };

    const handleMoviesClick = () => {
        window.location.href = "/movie";
    };

    const handleTvSeriesClick = () => {
        window.location.href = "/tvseries";
    };

    const handleBookmarkFilmsClick = () => {
        window.location.href = "/bookmarks";
    };

    const searchMovies = async () => {
        try {
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?query=${searchQuery}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <div className="home">
            <div className="homeMenu">
                <div className="homeMovies">
                    <img src="movie.svg" alt="Movies" />
                </div>
                <div className="homeBar">
                    <img src="./allFilms.svg" alt="All Films" onClick={handleAllFilmsClick} />
                    <img src="./movieLogo.svg" alt="Movie Logo" onClick={handleMoviesClick} />
                    <img src="./TVseries.svg" alt="TV Series" onClick={handleTvSeriesClick} />
                    <img src="./inActiveBookmark.svg" alt="Bookmark" onClick={handleBookmarkFilmsClick} />
                </div>
                <div className="homeAccount">
                    <img src="./man.png" alt="Account" />
                </div>
            </div>
            <div className="homeHero">
                <div className="homeSearch">
                    <SearchIcon className="searchIcon" />
                    <input className='searchInput' type="text" placeholder="Search for movies or TV series" />
                    <button onClick={searchMovies} className='searchBtn'>Search</button>
                </div>
                <div className="homeFilms">
                    <h3>Bookmarked Movies</h3>
                    <div className="filmCards">
                        {cardIds.map((id) => (
                            <BookmarkCard key={id} id={id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bookmark;
