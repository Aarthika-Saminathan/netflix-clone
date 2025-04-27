import React, { useState, useEffect, useRef } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzE3ZDk1NjY3NDcxMGYwMDRiM2RjMTc5OTlhNTJlZCIsIm5iZiI6MTc0NTcyOTA3NC44NCwic3ViIjoiNjgwZGI2MzIxMGQxZTQ1M2QyZWFkZmUyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9QN05H8gCRlhI_aAbyN-yOcSOIJIXlHUr9fJqxDEnCg'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY; // Corrected here
  };

  useEffect(() => {
    // Handle the category dynamically
    const fetchData = async () => {
      const endpoint = category ? `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1` : 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
      try {
        const res = await fetch(endpoint, options);
        const data = await res.json();
        setApiData(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    
    const refCurrent = cardsRef.current;
    refCurrent.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup function
    return () => {
      refCurrent.removeEventListener('wheel', handleWheel);
    };
  }, [category]);  // Add category to dependencies so the effect runs on category change

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} key={index}>
  <div className="card">
    <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.name} />
    <p>{card.original_title}</p>
  </div>
</Link>

          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
