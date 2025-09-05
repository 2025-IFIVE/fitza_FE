// src/pages/ShareDetail.js
import React, { useEffect, useState } from "react";
import * as S from "../styles/ShareDetailStyle"; // 전용 스타일 파일
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import backButton from "../img/backButton.png";
import minusButton from "../img/minusButton.png";
import axios from "axios";

function ShareDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  //const shareId = state?.shareId; // 옵션 B: state로 shareId 전달받음
  const shareId = state?.shareId;
  const readOnly = !!state?.readOnly; //삭제,수정버튼 readOnly

  const [detail, setDetail] = useState(null);
  const [itemsByCategory, setItemsByCategory] = useState({});

  useEffect(() => {
    const fetchShare = async () => {
      if (!shareId) {
        alert("잘못된 접근입니다.");
        navigate(-1);
        return;
      }
      try {
        const token = localStorage.getItem("authToken");
        // 1) 공유 상세 조회
        const res = await axios.get(`${process.env.REACT_APP_API}/api/share/${shareId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data; // { title, date(문자열), items:[{ clothId, x,y,size }...] }
        setDetail(data);

        // 2) 각 아이템의 clothId로 type / 이미지 경로 조회
        const clothMap = {};
        for (const item of data.items || []) {
          try {
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
          } catch (e) {
            console.error("의류 조회 실패:", e);
          }
        }
        setItemsByCategory(clothMap);
      } catch (err) {
        console.error("공유 코디 상세 조회 실패:", err);
      }
    };
    fetchShare();
  }, [shareId, navigate]);

  // 삭제하기 (캘린더 상세와 동일 UX)
  const handleDelete = async () => {
    if (!detail?.title && !window.confirm("정말 이 코디를 삭제하시겠습니까?")) return;
    if (detail?.title && !window.confirm(`"${detail.title}" 코디를 삭제할까요?`)) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${process.env.REACT_APP_API}/api/share/${shareId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("공유 코디 삭제 성공!");
      navigate("/sharecloset"); // 목록 페이지로
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("공유 코디 삭제 중 오류가 발생했습니다.");
    }
  };

  // 수정하기 (캘린더 상세와 동일 UX: Create 페이지를 edit 모드로)
  const handleEdit = () => {
    if (!detail) return;
    navigate("/sharecloset2", {
      state: {
        mode: "edit",
        shareId,
        title: detail.title,
        date: detail.date,
        items: detail.items
      }
    });
  };

  return (
    <S.Background>
      <S.TopBox>
        <TopBar />
      </S.TopBox>

      <S.Container>
        <S.Header>
          <S.BackButton onClick={() => navigate(-1)}>
            <img src={backButton} alt="뒤로 가기" />
          </S.BackButton>
          <S.Title>공유 코디 상세</S.Title>
        </S.Header>

        <S.TitleBox1>
          <S.Title1>{detail?.date || ""}</S.Title1>
          {!readOnly && (
            <S.RegisterContainer>
              <S.Register>삭제하기</S.Register>
              <button onClick={handleDelete} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <img src={minusButton} alt="minus" className="minusImage" />
              </button>
            </S.RegisterContainer>
          )}
        </S.TitleBox1>

        <S.CoordiName>{detail?.title || "코디 이름 없음"}</S.CoordiName>

        <S.RandomBoard>
          {Object.entries(itemsByCategory).map(([cat, item], index) => {
            const style = {
              top: `${item.y ?? 0}%`,
              left: `${item.x ?? 0}%`,
              size: item.size ?? 100
            };
            const src = `${process.env.REACT_APP_API}/${(item.croppedPath || item.imagePath || "").replace(/^\/?/, "")}`;

            return (
              <S.RandomItem
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
                  src={src}
                  alt={cat}
                  style={{ width: "100%", height: "auto", objectFit: "contain", pointerEvents: "none" }}
                />
              </S.RandomItem>
            );
          })}
        </S.RandomBoard>

        {!readOnly && <S.EditButton onClick={handleEdit}>수정하기</S.EditButton>}
      </S.Container>

      <S.BottomBox>
        <Footer />
      </S.BottomBox>
    </S.Background>
  );
}

export default ShareDetail;
