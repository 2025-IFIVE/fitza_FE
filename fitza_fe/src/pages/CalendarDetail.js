import React from "react";
import * as C from "../styles/CalendarDetailStyle";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';
import backButton from '../img/backButton.png';
import calendar_black from '../img/calendar_black.png';

function CalendarDetail() {
  const navigate = useNavigate();

  return (
    <C.Background>
      <C.TopBox>
        <TopBar />
      </C.TopBox>

      <C.Container>
        <C.Header>
          <C.BackButton onClick={() => navigate(-1)}>
            <img src={backButton} alt="뒤로 가기" />
          </C.BackButton>
          <C.Title>캘린더 상세</C.Title>
        </C.Header>

        <C.TitleBox1>
          <C.dateContainer>
            <Link to="/CalendarModal">
              <img src={calendar_black} alt="calendar_black" className="calendar_black" />
            </Link>
            <C.Title1>2025.02.16</C.Title1>
          </C.dateContainer>
          <C.RegisterContainer>
            <C.Register>수정하기</C.Register>
            <Link to="/Camera">
              <img src={smallPlus} alt="plus" className="plusImage" />
            </Link>
          </C.RegisterContainer>
        </C.TitleBox1>

        <C.Board></C.Board>
        <C.EditButton>수정하기</C.EditButton>
      </C.Container>

      <C.BottomBox>
        <Footer />
      </C.BottomBox>
    </C.Background>
  );
}

export default CalendarDetail;