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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOptionClick = () => {
    navigate("/main");
    closeModal();
  };

  return (
    <>
      <footer className="footer">
        <Link to="/Main">
          <img src={homeButton} alt="Home" className="footerImage" />
        </Link>
        <Link to="/MyCloset_1">
          <img src={closetButton} alt="MyCloset_1" className="footerImage" />
        </Link>
        <button className="footerPlusButton" onClick={openModal}>
          <img src={plusButton} alt="Plus" className="footerImage" />
        </button>
        <Link to="/CalendarPage">
          <img src={calendarButton} alt="Calendar" className="footerImage" />
        </Link>
        <Link to="/Mypage">
          <img src={mypageButton} alt="Mypage" className="footerImage" />
        </Link>
      </footer>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-button" onClick={() => { navigate("/clothesRegistration"); closeModal(); }}>
          옷 등록
          </button>
            <button className="modal-button" onClick={() => { navigate("/shoeshats"); closeModal(); }}>잡화 등록</button>
            <button className="modal-button" onClick={() => { navigate("/calendarcreate3"); closeModal(); }}>OOTD 등록</button>
            <button className="modal-button" onClick={() => { navigate("/bodyshape"); closeModal(); }}>체형 분석</button>
            <button className="close-button" onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
