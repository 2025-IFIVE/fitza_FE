import React, { useState, useEffect } from "react";
import * as C from "../styles/CalendarCreateStyle";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import smallPlus from "../img/smallPlus.png";
import backButton from "../img/backButton.png";
import calendar_black from "../img/calendar_black.png";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

Modal.setAppElement("#root");

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

function CalendarCreate() {
  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = location.state?.mode === "edit";
  const editCalendarId = location.state?.calendarId;

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("상의");
  const [coordiName, setCoordiName] = useState("");
  const [clothingData, setClothingData] = useState([]);
  const [selectedImages, setSelectedImages] = useState({
    상의: null,
    하의: null,
    아우터: null,
    셋업: null,
    신발: null,
    가방: null,
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const categoryList = ["상의", "하의", "아우터", "셋업", "신발", "가방"];

  // 1. 옷장 불러오기
  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("http://localhost:8080/api/clothing/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClothingData(res.data);
      } catch (err) {
        console.error("옷장 불러오기 실패:", err);
      }
    };
    fetchClothing();
  }, []);

  // 2. 수정 모드 초기화
  useEffect(() => {
    if (isEditMode && location.state) {
      setCoordiName(location.state.title);
      setSelectedDate(new Date(location.state.date));

      const fetchTypes = async () => {
        const token = localStorage.getItem("authToken");
        const imagesByCat = {};
        for (const item of location.state.items) {
          try {
            const res = await axios.get(`http://localhost:8080/api/clothing/${item.clothId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const type = res.data?.type;
            if (type) {
              imagesByCat[type] = { ...item, type };
            }
          } catch (err) {
            console.error("cloth type 불러오기 실패:", err);
          }
        }
        setSelectedImages(imagesByCat);
      };

      fetchTypes();
    }
  }, [location]);

  // 3. 스크롤 제어
  useEffect(() => {
    document.body.style.overflow = isBottomSheetOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isBottomSheetOpen]);

  const handleImageSelect = (tab, item) => {
    setSelectedImages((prev) => ({ ...prev, [tab]: item }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    const items = Object.values(selectedImages)
      .filter((item) => item !== null)
      .map((item) => ({
        clothId: item.clothId || item.clothid,
        x: item.x ?? null,
        y: item.y ?? null,
        size: item.size ?? null,
      }));

    const dataToSend = {
      title: coordiName,
      date: formatDate(selectedDate),
      weather: "더미",
      items,
    };

    try {
      console.log("전송 데이터:", dataToSend);
      if (isEditMode) {
        await axios.put(`http://localhost:8080/api/coordination/${editCalendarId}`, dataToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("코디 수정 성공!");
      } else {
        await axios.post("http://localhost:8080/api/coordination", dataToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("코디 등록 성공!");
      }
      navigate("/calendarpage");
    } catch (err) {
      console.error("등록/수정 실패:", err);
      alert("요청 실패");
    }
  };

  return (
    <C.Background>
      <C.TopBox>
        <TopBar />
      </C.TopBox>

      <C.Container>
        <C.Header>
          <C.BackButton onClick={() => navigate(-1)}>
            <img src={backButton} alt="뒤로" />
          </C.BackButton>
          <C.Title>{isEditMode ? "코디 수정하기" : "코디 기록하기"}</C.Title>
        </C.Header>

        <C.TitleBox1>
          <C.dateContainer>
            <button
              onClick={() => setIsCalendarOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <img src={calendar_black} alt="calendar_black" />
            </button>
            <C.Title1>{selectedDate.toLocaleDateString("ko-KR").replace(/\. /g, "-").replace(".", "")}</C.Title1>
          </C.dateContainer>
          <C.RegisterContainer>
            <C.Register>촬영하기</C.Register>
            <Link to="/Camera">
              <img src={smallPlus} alt="plus" />
            </Link>
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
                <img 
                  src={`http://localhost:8080${selectedImages[cat].croppedPath || selectedImages[cat].imagePath}`} 
                  alt={cat}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <C.ImagePlaceholder>{cat} 없음</C.ImagePlaceholder>
              )}
            </C.Section>
          ))}
        </C.Board>

        <C.ButtonContainer>
          <C.EditButton onClick={() => setIsBottomSheetOpen(true)}>옷장에서 선택</C.EditButton>
          <C.FinishButton onClick={handleSubmit}>{isEditMode ? "수정 완료" : "등록하기"}</C.FinishButton>
        </C.ButtonContainer>

        {isBottomSheetOpen && (
          <C.BottomSheet>
            <C.CloseButton onClick={() => setIsBottomSheetOpen(false)}>완료</C.CloseButton>
            <C.TabContainer>
              {categoryList.map((tab, index) => (
                <C.TabButton
                  key={index}
                  onClick={() => setSelectedTab(tab)}
                  style={selectedTab === tab ? { backgroundColor: "#CE9694" } : {}}
                >
                  {tab}
                </C.TabButton>
              ))}
            </C.TabContainer>
            <C.ImageContainer>
              <C.ImageGrid>
                {clothingData
                  .filter((item) => item.type === selectedTab)
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

      <C.BottomBox>
        <Footer />
      </C.BottomBox>
    </C.Background>
  );
}

export default CalendarCreate;
