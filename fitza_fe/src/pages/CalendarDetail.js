import React, { useEffect, useState } from "react";
import * as C from "../styles/CalendarDetailStyle";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { Link, useNavigate, useLocation } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';
import backButton from '../img/backButton.png';
import axios from "axios";

function CalendarDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || "날짜 선택 안됨";
  const calendarId = location.state?.calendarId;

  const [coordi, setCoordi] = useState(null);
  const [itemsByCategory, setItemsByCategory] = useState({});

  const categoryList = ['상의', '하의', '아우터', '셋업', '신발', '가방'];

  useEffect(() => {
    const fetchCoordi = async () => {
      if (!calendarId) return;
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`http://localhost:8080/api/coordination/${calendarId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = res.data;
        setCoordi(data);

        // 서버에서 clothId만 오므로 type 매핑을 위해 옷 정보 가져오기
        const clothMap = {};
        for (const item of data.items) {
          const clothRes = await axios.get(`http://localhost:8080/api/clothing/${item.clothId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const clothType = clothRes.data?.type;
          if (clothType) {
            clothMap[clothType] = {
              ...item,
              type: clothType
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
            <C.Register>수정하기</C.Register>
            <Link to="/Camera">
              <img src={smallPlus} alt="plus" className="plusImage" />
            </Link>
          </C.RegisterContainer>
        </C.TitleBox1>

        <C.CoordiName>{coordi?.title || "코디 이름 없음"}</C.CoordiName>

        <C.Board>
          {categoryList.map((cat, i) => (
            <C.Section key={i}>
              {itemsByCategory[cat] ? (
                <img
                  src={`http://localhost:8080${itemsByCategory[cat].croppedPath || itemsByCategory[cat].imagePath}`}
                  alt={cat}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <C.ImagePlaceholder>{cat} 없음</C.ImagePlaceholder>
              )}
            </C.Section>
          ))}
        </C.Board>

        <C.EditButton>수정하기</C.EditButton>
      </C.Container>

      <C.BottomBox>
        <Footer />
      </C.BottomBox>
    </C.Background>
  );
}

export default CalendarDetail;
