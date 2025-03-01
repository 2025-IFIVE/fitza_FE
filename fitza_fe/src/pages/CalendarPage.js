import React, { useState, useEffect } from "react";
import * as C from "../styles/CalendarPageStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 스타일 import

function CalendarPage() {

  const [date, setDate] = useState(new Date());
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  //title1에 날짜 불러오기
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    // 오늘 날짜를 'YYYY.MM.DD' 형식으로 가져오기
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    setCurrentDate(formattedDate);
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행


  return (
    <C.Background>
      <C.TopBox>
        <TopBar />
      </C.TopBox>

      <C.Container>
        <C.Header>
          <C.Logo>FITZA</C.Logo>
          <C.Title>캘린더</C.Title>
        </C.Header>
        <C.TitleBox1>
          <C.Title1>{currentDate}</C.Title1>
          <C.RegisterContainer>
            <C.Register>옷 기록하기</C.Register>
            <Link to="/CalendarCreate">
              <img src={smallPlus} alt="plus" className="plusImage" />
            </Link>
          </C.RegisterContainer>
        </C.TitleBox1>

        <C.CalendarWrapper>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="react-calendar" // 여기서 추가 스타일을 할 수 있음
          />
        </C.CalendarWrapper>
      </C.Container>

      <C.BottomBox>
        <Footer />
      </C.BottomBox>
    </C.Background>
  );
}

export default CalendarPage;
