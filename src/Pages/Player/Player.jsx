import React, { useState, useEffect } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'; 
import {useNavigate ,useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams(); // Get movie ID from the URL


  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzE3ZDk1NjY3NDcxMGYwMDRiM2RjMTc5OTlhNTJlZCIsIm5iZiI6MTc0NTcyOTA3NC44NCwic3ViIjoiNjgwZGI2MzIxMGQxZTQ1M2QyZWFkZmUyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9QN05H8gCRlhI_aAbyN-yOcSOIJIXlHUr9fJqxDEnCg'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          // Set the first video from the results
          setApiData(data.results[0]);
        } else {
          console.error('No video data available');
        }
      })
      .catch(err => console.error('Error fetching data:', err));
  }, [id]);
  
  return (
    <div className="player">
       <img 
        src={back_arrow_icon} 
        alt="Back to previous page" 
        onClick={() => navigate(-2)}  // Navigate back to the previous page
        className="back-arrow"  // You can apply additional styling here
      />
    <iframe
  width="90%"
  height="90%"
  src={`https://www.youtube.com/embed/${apiData.key}`}  // Embed using the key from the API data
  title="trailer"
  frameBorder="0"
  allowFullScreen
></iframe>


      {/* Player Info Section */}
      <div className="player-info">
        <p> {apiData.published_at?.slice(0, 10)}</p>
        <p> {apiData.name}</p>
        <p> {apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
