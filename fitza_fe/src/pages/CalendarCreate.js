import React, { useState, useEffect } from "react";
import * as C from "../styles/CalendarCreateStyle";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';
import backButton from '../img/backButton.png';
import calendar_black from '../img/calendar_black.png';
import Modal from "react-modal";
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css";
import axios from "axios";

Modal.setAppElement('#root');

// ✅ 로컬 날짜 포맷 함수 추가
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

function CalendarCreate() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('상의');
  const [coordiName, setCoordiName] = useState("");
  const [clothingData, setClothingData] = useState([]); // 전체 옷장 데이터
  const [selectedImages, setSelectedImages] = useState({
    '상의': null,
    '하의': null,
    '아우터': null,
    '셋업': null,
    '신발': null,
    '가방': null
  });

  const navigate = useNavigate();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:8080/api/clothing/my", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClothingData(response.data);
      } catch (err) {
        console.error("옷장 로딩 실패", err);
      }
    };
    fetchClothing();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isBottomSheetOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isBottomSheetOpen]);

  const handleImageSelect = (tab, item) => {
    setSelectedImages(prev => ({ ...prev, [tab]: item }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    const items = Object.values(selectedImages)
      .filter(item => item !== null)
      .map(item => ({
        clothId: item.clothid,
        x: null,
        y: null,
        size: null
      }));

    const dataToSend = {
    title: coordiName,
    date: formatDate(selectedDate), 
    weather: "맑음",
    items
    };

    try {
      console.log("📦 등록 데이터:", dataToSend);
      await axios.post("http://localhost:8080/api/coordination", {
        title: coordiName,
        date: formatDate(selectedDate),
        weather: "맑음", // 필요 시 동적으로 변경
        items
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("코디 등록 성공!");
      navigate("/calendarpage");
    } catch (err) {
      console.error("등록 실패", err);
      alert("등록 실패");
    }
  };

  const categoryList = ['상의', '하의', '아우터', '셋업', '신발', '가방'];

  return (
    <C.Background>
      <C.TopBox><TopBar /></C.TopBox>
      <C.Container>
        <C.Header>
          <C.BackButton onClick={() => navigate(-1)}><img src={backButton} alt="뒤로" /></C.BackButton>
          <C.Title>코디 기록하기</C.Title>
        </C.Header>

        <C.TitleBox1>
          <C.dateContainer>
            <button onClick={() => setIsCalendarOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <img src={calendar_black} alt="calendar_black" />
            </button>
            <C.Title1>{selectedDate.toLocaleDateString("ko-KR").replace(/\. /g, '-').replace('.', '')}</C.Title1>
          </C.dateContainer>
          <C.RegisterContainer>
            <C.Register>촬영하기</C.Register>
            <Link to="/Camera"><img src={smallPlus} alt="plus" /></Link>
          </C.RegisterContainer>
        </C.TitleBox1>

        <Modal isOpen={isCalendarOpen} onRequestClose={() => setIsCalendarOpen(false)}>
          <h3>날짜 선택</h3>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
          <button onClick={() => setIsCalendarOpen(false)}>닫기</button>
        </Modal>

        <C.CoordiNameInput
          type="text"
          placeholder="코디 이름을 입력하세요"
          value={coordiName}
          onChange={(e) => setCoordiName(e.target.value)}
        />

        <C.Board>
          {categoryList.map((cat, i) => (
            <C.Section key={i}>
              {selectedImages[cat] ? (
                <img src={`http://localhost:8080${selectedImages[cat].croppedPath}`} alt={cat} />
              ) : (
                <C.ImagePlaceholder>{cat} 없음</C.ImagePlaceholder>
              )}
            </C.Section>
          ))}
        </C.Board>

        <C.ButtonContainer>
          <C.EditButton onClick={() => setIsBottomSheetOpen(true)}>옷장에서 선택</C.EditButton>
          <C.FinishButton onClick={handleSubmit}>등록하기</C.FinishButton>
        </C.ButtonContainer>

        {isBottomSheetOpen && (
          <C.BottomSheet>
            <C.CloseButton onClick={() => setIsBottomSheetOpen(false)}>완료</C.CloseButton>
            <C.TabContainer>
              {categoryList.map((tab, index) => (
                <C.TabButton key={index} onClick={() => setSelectedTab(tab)} style={selectedTab === tab ? { backgroundColor: '#CE9694' } : {}}>
                  {tab}
                </C.TabButton>
              ))}
            </C.TabContainer>
            <C.ImageContainer>
              <C.ImageGrid>
                {clothingData
                  .filter(item => item.type === selectedTab)
                  .map((item, idx) => (
                    <C.ImageBox key={idx} onClick={() => handleImageSelect(selectedTab, item)}>
                      <img src={`http://localhost:8080${item.imagePath}`} alt={`cloth-${item.clothid}`} />
                    </C.ImageBox>
                  ))}
              </C.ImageGrid>
            </C.ImageContainer>
          </C.BottomSheet>
        )}
      </C.Container>
      <C.BottomBox><Footer /></C.BottomBox>
    </C.Background>
  );
}

export default CalendarCreate;
