import React, { useState, useEffect } from "react";
import * as C from "../styles/CalendarPageStyle";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import { normalizeAbsoluteUrl } from "../utils/url.ts";


const formatDateForDisplay = (date) => {
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}.${month}.${day}`; // for display
};

const formatDateForApi = (date) => {
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`; // for key lookup or backend
};



function CalendarPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState('');
  const [outfits, setOutfits] = useState({});

  
  useEffect(() => {
    const fetchCoordis = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const listRes = await axios.get(`${process.env.REACT_APP_API}/api/coordination/my`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const coordiList = listRes.data;
        const imageMap = {};

        await Promise.all(
          coordiList.map(async (coordi) => {
            try {
              const detailRes = await axios.get(`${process.env.REACT_APP_API}/api/coordination/${coordi.calendarId}`, {
                headers: { Authorization: `Bearer ${token}` }
              });

              const detail = detailRes.data;
              const itemsByCategory = {};

              for (const item of detail.items) {
                const clothRes = await axios.get(`${process.env.REACT_APP_API}/api/clothing/${item.clothId}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });

                const type = clothRes.data?.type;
                if (type) {
                  itemsByCategory[type] = {
                    ...item,
                    type
                  };
                }
              }

              imageMap[detail.date] = {
                calendarId: detail.calendarId,
                itemsByCategory
              };
            } catch (err) {
              console.error("상세 조회 실패:", err);
            }
          })
        );

        setOutfits(imageMap);
      } catch (err) {
        console.error("목록 조회 실패:", err);
      }
    };

    const today = new Date();
    setCurrentDate(formatDateForDisplay(today));

    fetchCoordis();
  }, []);

  const handleDateChange = (newDate) => setDate(newDate);

  const handleDateClick = (selectedDate) => {
    const formattedDate = formatDateForDisplay(selectedDate);
    const apiFormatted = formatDateForApi(selectedDate);


    const coordi = outfits[apiFormatted];
    if (coordi) {
      navigate("/CalendarDetail", {
        state: {
          selectedDate: formattedDate,
          calendarId: coordi.calendarId
        }
      });
    } else {
      alert("등록된 코디가 없습니다.");
    }
  };

  return (
    <C.Background>
      <C.TopBox><TopBar /></C.TopBox>

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
            tileContent={({ date }) => {
              const key = formatDateForApi(date);
              const coordi = outfits[key];
              const itemsByCategory = coordi?.itemsByCategory || {};

              return coordi ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gridTemplateRows: 'repeat(2, 1fr)',
                  gap: '1px',
                  width: '100%',
                  height: '70px',
                  paddingTop: '3px'
                }}>
                  {Object.values(itemsByCategory).map((item, idx) => {
                    const imagePath = item?.croppedPath || item?.imagePath;
                    return (
                      <div key={idx} style={{ width: '100%', height: '100%' }}>
                        {imagePath && (
                          <img
                          src={normalizeAbsoluteUrl(imagePath, process.env.REACT_APP_API)}
                            alt={`coordi-${idx}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '2px'
                            }}
                          />
                        )}
                      </div>
                    );
                  })}

                </div>
              ) : null;
            }}
            onClickDay={handleDateClick}
          />
        </C.CalendarWrapper>

        
      </C.Container>

      <C.BottomBox><Footer /></C.BottomBox>
    </C.Background>
  );
}

export default CalendarPage;