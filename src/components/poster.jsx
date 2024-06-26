import React, { useEffect, useRef } from 'react';
import './poster.css';

const Poster = ({ response = [], currentIndex, fullScreen, setFullScreen }) => {
    const refs = useRef([]);
    refs.current = response.map((_, i) => refs.current[i] ?? React.createRef());

    useEffect(() => {
        if (refs.current[currentIndex] && refs.current[currentIndex].current) {
            refs.current[currentIndex].current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center'
            });
        }
    }, [currentIndex]);

    if (response.length === 0) return (
        <div className='original-poster'>
            {/* Default posters if no response is available */}
            <img src="https://a.ltrbxd.com/resized/sm/upload/ji/5q/0k/rv/v6xrz4fr92KY1oNC3HsEvrsvR1n-0-2000-0-3000-crop.jpg?v=973d70bb0c" alt="Seven Samurai" />
            <img src="https://a.ltrbxd.com/resized/film-poster/5/1/7/0/0/51700-12-angry-men-0-2000-0-3000-crop.jpg?v=b8aaf291a9" alt="12 Angry Men" />
            <img src="https://a.ltrbxd.com/resized/film-poster/5/1/4/4/4/51444-pulp-fiction-0-2000-0-3000-crop.jpg?v=dee19a8077" alt="Pulp Fiction" />
            <img src="https://a.ltrbxd.com/resized/film-poster/2/6/9/0/2690-apocalypse-now-0-2000-0-3000-crop.jpg?v=d4f99c09a3" alt="Apocalypse Now" />
        </div>
    );

    return (
        <div className={`image-container ${fullScreen ? 'full-screen' : ''}`}>
            {response.map((item, index) => (
                <img
                    key={index}
                    ref={refs.current[index]}
                    src={item.imgSrc}
                    alt={item.title}
                    className={index === currentIndex ? 'highlight' : ''}
                />
            ))}
        </div>
    );
};

export default Poster;
