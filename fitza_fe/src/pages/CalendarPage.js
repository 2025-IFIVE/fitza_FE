import React, { useState, useEffect } from "react";
import * as C from "../styles/CalendarPageStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';

import dummyCoordi1 from '../img/sam1.jpg';
import dummyCoordi2 from '../img/sam2.jpg';
import dummyCoordi3 from '../img/sam3.jpg';
import dummyCoordi4 from '../img/sam4.jpg';
import dummyCoordi5 from '../img/sam5.jpg';
import dummyCoordi6 from '../img/sam6.jpg';
import dummyCoordi7 from '../img/sam7.jpg';
import dummyCoordi8 from '../img/sam8.jpg';
import dummyCoordi9 from '../img/sam9.jpg';
import dummyCoordi10 from '../img/sam10.jpg';
import dummyCoordi11 from '../img/sam11.jpg';
import dummyCoordi12 from '../img/sam12.jpg';
import dummyCoordi13 from '../img/sam13.jpg';
import dummyCoordi14 from '../img/sam14.jpg';


import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 스타일 import

//더미데이터
import img2 from '../img/img6.png';
import img8 from '../img/img8.png';
import img9 from '../img/img9.png';

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

  //자주 입은 옷 더미데이터터
  const dummyMostWorn = [
    { category: "상의", image: img2, count: 10 },
    { category: "하의", image: img8, count: 8 },
    { category: "기타", image: img9, count: 5 },
  ];
  useEffect(() => {
    // 오늘 날짜를 'YYYY.MM.DD' 형식으로 가져오기
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    setCurrentDate(formattedDate);
  

    // 더미 데이터 - 날짜별 코디 이미지
    const outfitData = {
      "2025-04-01": dummyCoordi1,
      "2025-04-02": dummyCoordi2,
      "2025-04-03": dummyCoordi3,
      "2025-04-04": dummyCoordi4,
      "2025-04-08": dummyCoordi5,
      "2025-04-10": dummyCoordi6,
      "2025-04-11": dummyCoordi7,
      "2025-04-13": dummyCoordi8,
      "2025-04-14": dummyCoordi9,
      "2025-04-16": dummyCoordi10,
      "2025-04-18": dummyCoordi11,
      "2025-04-22": dummyCoordi12,
      "2025-04-23": dummyCoordi13,
      "2025-04-25": dummyCoordi14
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
          {dummyMostWorn.map((item, index) => (
            <C.OftenItem key={index}>
              <C.OftenCateg>{item.category}</C.OftenCateg>
              <C.OftenImage src={item.image} alt={item.category} />
              <C.OftenCount>{item.count}회 착용</C.OftenCount>
            </C.OftenItem>
          ))}
        </C.OftenContainer>
      </C.Container>

      <C.BottomBox>
        <Footer />
      </C.BottomBox>
    </C.Background>
  );
}

export default CalendarPage;
