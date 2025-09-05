import React, { useEffect, useState } from "react";
import * as C from "../styles/CalendarDetailStyle";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { Link, useNavigate, useLocation } from "react-router-dom";
import backButton from '../img/backButton.png';
import minusButton from '../img/minusButton.png';
import axios from "axios";
import { normalizeAbsoluteUrl } from "../utils/url.ts";

function CalendarDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || "날짜 선택 안됨";
  const calendarId = location.state?.calendarId;

  const [coordi, setCoordi] = useState(null);
  const [itemsByCategory, setItemsByCategory] = useState({});

  const categoryList = ['상의', '하의', '아우터', '원피스', '신발', '가방'];

  useEffect(() => {
    const fetchCoordi = async () => {
      if (!calendarId) return;
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${process.env.REACT_APP_API}/api/coordination/${calendarId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = res.data;
        setCoordi(data);

        const clothMap = {};
        for (const item of data.items) {
          const clothRes = await axios.get(`${process.env.REACT_APP_API}/api/clothing/${item.clothId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const clothType = clothRes.data?.type;
          if (clothType) {
            clothMap[clothType] = {
              ...item,
              type: clothType,
              croppedPath: clothRes.data?.croppedPath,
              imagePath: clothRes.data?.imagePath
            };
          }
        }

        setItemsByCategory(clothMap);
      } catch (err) {
        console.error("코디 상세 조회 실패:", err);
      }
    };

    fetchCoordi();
  }, [calendarId]);

  const handleDelete = async () => {
    if (!window.confirm("정말 이 코디를 삭제하시겠습니까?")) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${process.env.REACT_APP_API}/api/coordination/${calendarId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("코디 삭제 성공!");
      navigate("/calendarpage");
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("코디 삭제 중 오류가 발생했습니다.");
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
            <img src={backButton} alt="뒤로 가기" />
          </C.BackButton>
          <C.Title>캘린더 상세</C.Title>
        </C.Header>

        <C.TitleBox1>
          <C.Title1>{selectedDate}</C.Title1>
          <C.RegisterContainer>
            <C.Register>삭제하기</C.Register>
            <button onClick={handleDelete} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <img src={minusButton} alt="minus" className="minusImage" />
            </button>
          </C.RegisterContainer>
        </C.TitleBox1>

        <C.CoordiName>{coordi?.title || "코디 이름 없음"}</C.CoordiName>

        <C.RandomBoard>
          {Object.entries(itemsByCategory).map(([cat, item], index) => {
            const style = {
              top: `${item.y}%`,
              left: `${item.x}%`,
              size: item.size ?? 100
            };

            return (
              <C.RandomItem
                key={index}
                $top={style.top}
                $left={style.left}
                style={{
                  position: "absolute",
                  width: `${style.size}%`,
                  cursor: "default",
                  zIndex: 10 + index,
                  userSelect: "none",
                  transition: "all 0.1s ease"
                }}
              >
                <img
                  src={normalizeAbsoluteUrl(item.croppedPath || item.imagePath, process.env.REACT_APP_API)}
                  alt={cat}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none"
                  }}
                />
              </C.RandomItem>
            );
          })}
        </C.RandomBoard>

        <C.EditButton onClick={() => {
          navigate("/CalendarCreate", {
            state: {
              mode: "edit",
              calendarId: coordi.calendarId,
              title: coordi.title,
              date: coordi.date,
              items: coordi.items
            }
          });
        }}>수정하기</C.EditButton>
      </C.Container>

      <C.BottomBox>
        <Footer />
      </C.BottomBox>
    </C.Background>
  );
}

export default CalendarDetail;
