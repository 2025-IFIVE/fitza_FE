// src/pages/ShareDetail.js
import React, { useEffect, useState, useMemo } from "react";
import * as S from "../styles/ShareDetailStyle";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import backButton from "../img/backButton.png";
import minusButton from "../img/minusButton.png";
import axios from "axios";
import { normalizeAbsoluteUrl } from "../utils/url.ts";

export default function ShareDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const shareId = state?.shareId; // state 방식 (간단/빠름)

  const API_BASE = process.env.REACT_APP_API;
  const [detail, setDetail] = useState(null);
  const [items, setItems] = useState([]); // [{x,y,size, src, type, clothId}, ...]

  // 잘못된 진입 보호
  useEffect(() => {
    if (!shareId) {
      alert("잘못된 접근입니다.");
      navigate("/sharecloset");
    }
  }, [shareId, navigate]);

  // 상세 + 아이템 이미지/타입 로딩
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token || !shareId) return;

    (async () => {
      try {
        // 1) 공유 상세
        const { data: share } = await axios.get(
          normalizeAbsoluteUrl(`api/share/${shareId}`, API_BASE),
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDetail(share);

        // 2) 항목별 의류 정보 병렬 조회 (type, image/croppedPath)
        const lookups = (share.items || []).map(async (it) => {
          try {
            const { data: cloth } = await axios.get(
              normalizeAbsoluteUrl(`api/clothing/${it.clothId}`, API_BASE),
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const raw = cloth?.croppedPath || cloth?.imagePath || "";
            return {
              ...it,
              type: cloth?.type || "",
              src: normalizeAbsoluteUrl(raw, API_BASE),
            };
          } catch (e) {
            console.error("의류 조회 실패:", e);
            return { ...it, type: "", src: "" };
          }
        });

        const resolved = await Promise.all(lookups);
        setItems(resolved);
      } catch (err) {
        console.error("공유 코디 상세 조회 실패:", err);
      }
    })();
  }, [shareId, API_BASE]);

  // 삭제
  const handleDelete = async () => {
    if (!detail) return;
    const name = detail?.title ? `"${detail.title}"` : "이 코디";
    if (!window.confirm(`${name}를 삭제하시겠습니까?`)) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        normalizeAbsoluteUrl(`api/share/${shareId}`, API_BASE),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("공유 코디 삭제 성공!");
      navigate("/sharecloset");
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("공유 코디 삭제 중 오류가 발생했습니다.");
    }
  };

  // 수정 (등록 화면으로 전달)
  const handleEdit = () => {
    if (!detail) return;
    navigate("/sharecloset2", {
      state: {
        mode: "edit",
        shareId,
        title: detail.title,
        date: detail.date,
        items: detail.items,
      },
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
          <S.RegisterContainer>
            <S.Register>삭제하기</S.Register>
            <button
              onClick={handleDelete}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <img src={minusButton} alt="minus" className="minusImage" />
            </button>
          </S.RegisterContainer>
        </S.TitleBox1>

        <S.CoordiName>{detail?.title || "코디 이름 없음"}</S.CoordiName>

        <S.RandomBoard>
          {items.map((item, idx) => {
            const x = item?.x ?? 0;
            const y = item?.y ?? 0;
            const size = item?.size ?? 100;
            return (
              <S.RandomItem
                key={`${item.clothId}-${idx}`}
                style={{
                  position: "absolute",
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}%`,
                  zIndex: 10 + idx,
                  userSelect: "none",
                  transition: "all 0.1s ease",
                }}
              >
                {item.src ? (
                  <img
                    src={item.src}
                    crossOrigin="anonymous"
                    alt={item?.type || `item-${idx}`}
                    style={{ width: "100%", height: "auto", objectFit: "contain", pointerEvents: "none" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                ) : null}
              </S.RandomItem>
            );
          })}
        </S.RandomBoard>

        <S.EditButton onClick={handleEdit}>수정하기</S.EditButton>
      </S.Container>

      <S.BottomBox>
        <Footer />
      </S.BottomBox>
    </S.Background>
  );
}
