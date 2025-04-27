import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/search_icon.svg';
import bellIcon from '../../assets/bell_icon.svg';
import profileIcon from '../../assets/profile_img.png';
import caretIcon from '../../assets/caret_icon.svg';
import { logout } from '../../Firebase';

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current?.classList.add('nav-dark');
      } else {
        navRef.current?.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function (important for good React practice)
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="navbar" ref={navRef}>
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={searchIcon} alt="Search" className="icons" />
        <p>Children</p>
        <img src={bellIcon} alt="Notifications" className="icons" />
        <div className="navbar-profile">
          <img src={profileIcon} alt="Profile" className="profile-icon" />
          <img src={caretIcon} alt="Dropdown" className="caret-icon" />
          <div className="dropdown">
            <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;  