// CalendarCreate.js
import React, { useState, useEffect, useRef } from "react";
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
import { normalizeAbsoluteUrl } from "../utils/url.ts";

Modal.setAppElement("#root");

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

function CalendarCreate4() {
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
    원피스: null,
    신발: null,
    가방: null,
  });
  const [imageStyles, setImageStyles] = useState({});
  const [dragState, setDragState] = useState({});
  const [resizeState, setResizeState] = useState({});
  const boardRef = useRef(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const labelToCategory = (label) => {
    const labelMap = {
      "20": "상의",
      "21": "하의",
      "22": "아우터",
      "23": "원피스",
      "24": "신발",
      "25": "가방"
    };
    return labelMap[label] || `기타${label}`;
  };
  
  const categoryList = ["상의", "하의", "아우터", "원피스", "신발", "가방"];

  const getRandomStyle = () => ({
    top: `${Math.floor(Math.random() * 60)}%`,
    left: `${Math.floor(Math.random() * 60)}%`,
  });

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${process.env.REACT_APP_API}/api/clothing/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClothingData(res.data);
      } catch (err) {
        console.error("옷장 불러오기 실패:", err);
      }
    };
    fetchClothing();
  }, []);

  useEffect(() => {
    if (isEditMode && location.state) {
      setCoordiName(location.state.title);
      setSelectedDate(new Date(location.state.date));

      const fetchTypes = async () => {
        const token = localStorage.getItem("authToken");
        const imagesByCat = {};
        const stylesByCat = {};

        for (const item of location.state.items) {
          try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/clothing/${item.clothId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const type = res.data?.type;
            if (type) {
              imagesByCat[type] = { ...item, type };
              stylesByCat[type] = {
                top: `${item.y}%`,
                left: `${item.x}%`,
                size: item.size ?? 100
              };
            }
          } catch (err) {
            console.error("cloth type 불러오기 실패:", err);
          }
        }

        setSelectedImages(imagesByCat);
        setImageStyles(stylesByCat);
      };

      fetchTypes();
    }
  }, [location]);

  useEffect(() => {
    const matched = location.state?.matchedImages;
    const labels = location.state?.labels;
  
    if (matched && labels && matched.length === labels.length) {
      const newImages = {};
      const newStyles = {};
  
      matched.forEach((url, idx) => {
        const clothId = parseInt(labels[idx]);

        newImages[clothId] = {
          imagePath: url.replace(process.env.REACT_APP_API, ""),
          clothid: clothId,
        };
        //수정ㅇ
        const { top, left } = getRandomStyle();
        newStyles[clothId] = { top, left, size: 30 };

      });

      setSelectedImages((prev) => ({ ...prev, ...newImages }));
      setImageStyles((prev) => ({ ...prev, ...newStyles }));
    }
  }, [location]);
  

  useEffect(() => {
    document.body.style.overflow = isBottomSheetOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isBottomSheetOpen]);

  const handleImageSelect = (tab, item) => {
    setSelectedImages((prev) => {
      const current = prev[tab];
      const currentId = current?.clothId || current?.clothid;
      const newId = item.clothId || item.clothid;

      // 같은 아이템을 다시 누른 경우: 제거
      if (current && currentId === newId) {
        const newImages = { ...prev };
        delete newImages[tab];

        // 스타일도 같이 삭제
        setImageStyles((prevStyle) => {
          const newStyles = { ...prevStyle };
          delete newStyles[tab];
          return newStyles;
        });

        return newImages;
      }

      // 새로운 아이템 선택
      return { ...prev, [tab]: item };
    });

    // 스타일 추가는 기존에 없을 때만 (삭제 시에는 실행되지 않음)
    setImageStyles((prev) => {
      if (prev[tab]) return prev;
      const { top, left } = getRandomStyle();
      return { ...prev, [tab]: { top, left, size: 30 } };
    });
  };

  const handleMouseDown = (cat, e) => {
    e.preventDefault();
    e.stopPropagation();
    const boardRect = boardRef.current?.getBoundingClientRect();
    if (!boardRect) return;

    const startX = e.clientX;
    const startY = e.clientY;

    const currentStyle = imageStyles[cat] || { left: "0%", top: "0%" };
    const currentLeft = parseFloat(currentStyle.left.replace("%", ""));
    const currentTop = parseFloat(currentStyle.top.replace("%", ""));

    setDragState({
      isDragging: true,
      category: cat,
      startX,
      startY,
      startLeft: currentLeft,
      startTop: currentTop
    });
  };

  const handleMouseMove = (e) => {
    if (!dragState.isDragging || !boardRef.current) return;
    e.preventDefault();

    const boardRect = boardRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;
    const deltaXPercent = (deltaX / boardRect.width) * 100;
    const deltaYPercent = (deltaY / boardRect.height) * 100;

    const newLeft = Math.max(0, Math.min(dragState.startLeft + deltaXPercent, 85));
    const newTop = Math.max(0, Math.min(dragState.startTop + deltaYPercent, 85));

    setImageStyles(prev => ({
      ...prev,
      [dragState.category]: {
        ...prev[dragState.category],
        left: `${newLeft}%`,
        top: `${newTop}%`
      }
    }));
  };

  const handleMouseUp = () => setDragState({});

  const handleResizeMouseDown = (cat, e) => {
    e.preventDefault();
    e.stopPropagation();
    setResizeState({
      isResizing: true,
      category: cat,
      startX: e.clientX,
      startSize: imageStyles[cat]?.size || 100,
    });
  };

  const handleResizeMouseMove = (e) => {
    if (!resizeState.isResizing) return;
    const deltaX = e.clientX - resizeState.startX;
    const newSize = Math.max(30, resizeState.startSize + deltaX * 0.5);
    setImageStyles(prev => ({
      ...prev,
      [resizeState.category]: {
        ...prev[resizeState.category],
        size: newSize
      }
    }));
  };

  const handleResizeMouseUp = () => setResizeState({});

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState]);

  useEffect(() => {
    if (resizeState.isResizing) {
      document.addEventListener('mousemove', handleResizeMouseMove);
      document.addEventListener('mouseup', handleResizeMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleResizeMouseMove);
        document.removeEventListener('mouseup', handleResizeMouseUp);
      };
    }
  }, [resizeState]);

  const handleSubmit = async () => {
  const token = localStorage.getItem("authToken");

  const items = Object.entries(selectedImages)
    .filter(([, item]) => item !== null)
    .map(([cat, item]) => {
      const { left = "0%", top = "0%", size = 100 } = imageStyles[cat] || {};
      return {
        clothId: item.clothId || item.clothid,
        x: parseFloat(left.replace("%", "")),
        y: parseFloat(top.replace("%", "")),
        size
      };
    });



  const dataToSend = {
    title: coordiName,
    date: formatDate(selectedDate),
    weather: "맑음",
    items,
  };

  try {
    if (isEditMode) {
      await axios.put(`${process.env.REACT_APP_API}/api/coordination/${editCalendarId}`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("코디 수정 성공!");
      navigate("/CalendarDetail", {
        state: {
          calendarId: editCalendarId,
          selectedDate: formatDate(selectedDate),
        },
      });
    } else {
      await axios.post(`${process.env.REACT_APP_API}/api/coordination`, dataToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
      alert("코디 등록 성공!");
      navigate("/Calendarpage");
    }
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

<C.RandomBoard ref={boardRef}>
          {Object.entries(selectedImages)
            .filter(([, item]) => item && (item.croppedPath || item.imagePath))
            .map(([cat, item], index) => {
              const style = imageStyles[cat] || { top: "0%", left: "0%", size: 100 };
              return (
                <C.RandomItem
                  key={`${cat}-${index}`}
                  $top={style.top}
                  $left={style.left}
                  style={{
                    position: "absolute",
                    width: `${style.size}%`,
                    cursor: dragState.isDragging && dragState.category === cat ? 'grabbing' : 'grab',
                    zIndex: dragState.category === cat ? 100 : 10 + index,
                    userSelect: 'none',
                    transition: 'all 0.1s ease'
                  }}
                  onMouseDown={(e) => handleMouseDown(cat, e)}
                >
                  {(() => {
                    const rawPath = item.croppedPath || item.imagePath || "";
                    const fullPath = normalizeAbsoluteUrl(rawPath, process.env.REACT_APP_API);
  
                          return (
                            <img
                          src={fullPath}
                          alt={cat}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            // 화면에 실패 메시지 표시
                            const errorDiv = document.createElement('div');
                            errorDiv.innerText = "이미지 로드 실패: " + fullPath;
                            errorDiv.style.color = 'red';
                            errorDiv.style.fontSize = '14px';
                            errorDiv.style.position = 'fixed';
                            errorDiv.style.top = '10px';
                            errorDiv.style.left = '10px';
                            errorDiv.style.zIndex = '9999';
                            errorDiv.style.backgroundColor = 'white';
                            errorDiv.style.padding = '5px';
                            errorDiv.style.border = '1px solid red';
                            document.body.appendChild(errorDiv);

                            // 기존 이미지 숨기기
                            e.target.style.display = "none";
                          }}
                          draggable={false}
                        />

                          );
                        })()}

                  <div
                    onClick={() => handleImageSelect(cat, item)}
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      width: 16,
                      height: 16,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      zIndex: 999,
                      lineHeight: 1
                    }}
                  >
                    ×
                  </div>
                  <div
                    onMouseDown={(e) => handleResizeMouseDown(cat, e)}
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: "gray",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      cursor: "nwse-resize"
                    }}
                  />
                </C.RandomItem>

              );
            })}
        </C.RandomBoard>

        <C.ButtonContainer>
          <C.EditButton onClick={() => setIsBottomSheetOpen(true)}>옷장에서 선택</C.EditButton>
          <C.FinishButton onClick={handleSubmit}>{isEditMode ? "수정 완료" : "등록하기"}</C.FinishButton>
        </C.ButtonContainer>

        {isBottomSheetOpen && (
          <C.BottomSheet style={{ zIndex: 9999 }}>
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
                      <img src={normalizeAbsoluteUrl(item.croppedPath, process.env.REACT_APP_API)} alt={`cloth-${item.clothid}`} />
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

export default CalendarCreate4;
