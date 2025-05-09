import React from 'react';
import './Home.css';
import Navbar from '../../Components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../Components/TItleCards/TitleCards';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
  return (
    <div className='home'>
      
      <Navbar />

      <div className="hero">
        <img src={hero_banner} alt="Hero Banner" className='banner-img' />

        <div className="hero-caption">
          <img src={hero_title} alt="Hero Title" className='caption-img' />
          <p>This is an image</p>

          <div className="hero-btns">
            <button className='btn'>
              <img src={play_icon} alt="Play" /> Play
            </button>
            <button className='dark-btn'>
              <img src={info_icon} alt="Info" /> More Info
            </button>
          </div>

          <TitleCards />
          
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
        <TitleCards title={"only on netflix"} category={"popular"}/>
        <TitleCards title={"upcomings"} category={"upcoming"}/>
        <TitleCards title={"top pics for you"} category={"now_playing"}/>
      </div>
      <Footer />

    </div>
  );
}

export default Home; 