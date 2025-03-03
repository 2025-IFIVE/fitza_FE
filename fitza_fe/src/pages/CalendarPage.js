import React, { useState, useEffect } from "react";
import * as C from "../styles/CalendarPageStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';
import dummyCoordi from '../img/sample-coordi-1.png';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 스타일 import

function CalendarPage() {

  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  //title1에 날짜 불러오기
  const [currentDate, setCurrentDate] = useState('');
  const [mostWorn, setMostWorn] = useState(null); // 더미 데이터 사용
  const [outfits, setOutfits] = useState({}); // 날짜별 코디 데이터

  useEffect(() => {
    // 오늘 날짜를 'YYYY.MM.DD' 형식으로 가져오기
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    setCurrentDate(formattedDate);
    
    //자주 입은 옷 더미데이터터
    const dummyData = {
      "상의": { image: "/images/top1.jpg", count: 10 },
      "하의": { image: "/images/bottom1.jpg", count: 8 },
      "기타": { image: "/images/shoes1.jpg", count: 5 }
    };
    setMostWorn(dummyData); // 더미 데이터 저장

    // 더미 데이터 - 날짜별 코디 이미지
    const outfitData = {
      "2025-03-01": dummyCoordi,
      "2025-03-02": dummyCoordi,
      "2025-03-03": dummyCoordi
    };
    setOutfits(outfitData);
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // 날짜 클릭 시 해당 날짜 상세 페이지로 이동
  const handleDateClick = (selectedDate) => {
    const formattedDate = `${selectedDate.getFullYear()}.${String(selectedDate.getMonth() + 1).padStart(2, '0')}.${String(selectedDate.getDate()).padStart(2, '0')}`;
    navigate("/CalendarDetail", { state: { selectedDate: formattedDate } });
  };


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
            <C.Register>코디 기록하기</C.Register>
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
            tileContent={({ date }) => {
              const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
              return outfits[formattedDate] ? (
                <C.TileImage src={outfits[formattedDate]} alt="코디 이미지" />
              ) : null;
            }}
            onClickDay={handleDateClick} // 날짜 클릭 시 이동
          />
        </C.CalendarWrapper>

        <C.OftenTitle>가장 많이 입은 옷</C.OftenTitle>
        <C.OftenContainer>
          {mostWorn ? (
            ["상의", "하의", "기타"].map((category, index) => (
              <C.OftenItem key={index}>
                <C.OftenCateg>{category}</C.OftenCateg>
                <C.OftenImage src={mostWorn[category].image} alt={category} />
                <C.OftenCount>{mostWorn[category].count}회 착용</C.OftenCount>
              </C.OftenItem>
            ))
          ) : (
            <C.LoadingText>로딩 중...</C.LoadingText>
          )}
        </C.OftenContainer>
      </C.Container>

      <C.BottomBox>
        <Footer />
      </C.BottomBox>
    </C.Background>
  );
}

export default CalendarPage;
