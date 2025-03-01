import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Footer.css";
import calendarButton from '../img/calendarButton.png';
import closetButton from '../img/closetButton.png';
import homeButton from '../img/homeButton.png';
import mypageButton from '../img/mypageButton.png';
import plusButton from '../img/plusButton.png';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <footer className="footer">
        <Link to="/Main">
          <img src={homeButton} alt="Home" className="footerImage" />
        </Link>
        <Link to="/MyCloset_1">
          <img src={closetButton} alt="MyCloset_1" className="footerImage" />
        </Link>
        <Link to="/Plus">
          <img src={plusButton} alt="Plus" className="footerImage" />
        </Link>
        <Link to="/CalendarPage">
          <img src={calendarButton} alt="Calendar" className="footerImage" />
        </Link>
        <Link to="/Mypage">
          <img src={mypageButton} alt="Mypage" className="footerImage" />
        </Link>
      </footer>
    </>
  );
};

export default Footer;
