import React, { useState, useRef } from "react";
import * as C from "../styles/CalendarCreate2Style";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { useNavigate } from "react-router-dom";
import smallPlus from '../img/cameraImage.png';
import backIcon from "../img/backButton.png";
import axios from "axios";

function CalendarCreate3() {
  const navigate = useNavigate();
  const [bodyImage, setBodyImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // 파일 객체
  const [isMatching, setIsMatching] = useState(false); // 🔹 로딩 모달 상태

  const cameraInputRef = useRef(null);
  const albumInputRef = useRef(null);

  const handleBackClick = () => {
    if (isMatching) return; // 로딩 중엔 뒤로가기 차단
    navigate(-1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setBodyImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCalendarSubmit = async () => {
    if (!imageFile) {
      alert("이미지를 먼저 선택해주세요.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const today = new Date();
    const formattedToday = today.toISOString().slice(0, 10); // 예: '2025-06-02'

    try {
      setIsMatching(true); // 🔹 로딩 시작

      // 이미 등록된 코디 확인
      const res = await axios.get(`${process.env.REACT_APP_API}/api/coordination/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const alreadyExists = res.data.some(item => item.date === formattedToday);
      if (alreadyExists) {
        alert("⚠️ 오늘 이미 등록된 코디가 있습니다!\n캘린더에서 해당 코디를 수정하거나 날짜를 변경해주세요.");
        setIsMatching(false);
        return;
      }

      // 매칭 요청
      const formData = new FormData();
      formData.append("file", imageFile);

      const matchRes = await axios.post(
        `${process.env.REACT_APP_API}/api/match/ootd`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          // timeout: 120000, // 필요하면 타임아웃 사용
        }
      );

      const data = matchRes.data;

      // ✅ 다음 페이지로 이동하면 이 컴포넌트 언마운트 → 모달 자동 종료
      navigate("/CalendarCreate", {
        state: {
          matchedImages: data.matchedImages,
          labels: data.labels,
          scores: data.scores,
          // matchedIds: data.matchedIds, // 백엔드에서 제공한다면 함께 전달 권장
        }
      });
    } catch (error) {
      console.error("❌ 매칭 실패 또는 등록 확인 실패:", error?.response || error);
      alert("옷 매칭 또는 등록 확인 중 오류가 발생했습니다.");
      setIsMatching(false); // 실패 시 로딩 종료
    }
  };

  return (
    <C.Background>
      <C.TopBox><TopBar /></C.TopBox>
      <C.Container style={{ pointerEvents: isMatching ? "none" : "auto", opacity: isMatching ? 0.95 : 1 }}>
        <C.Header>
          <C.Back onClick={handleBackClick} style={{ opacity: isMatching ? 0.5 : 1 }}>
            <img src={backIcon} alt="back" />
          </C.Back>
          <C.Title>OOTD 등록</C.Title>
        </C.Header>

        <C.TitleBox1>
          <C.Title1>캘린더에 OOTD를 등록하기 위한 사진 촬영</C.Title1>
        </C.TitleBox1>

        <C.LargeText><div>⚠️아직 등록된 OOTD 사진이 없습니다⚠️</div></C.LargeText>
        <C.SmallText><div>캘린더에 OOTD를 등록하기 위해 전신 사진을 찍어주세요</div></C.SmallText>
        <C.LargeText><div>📷전신 사진을 찍어주세요📷</div></C.LargeText>
        <C.SmallText><div>보다 정확한 자동 매칭을 위해 좋은 사진을 넣어라</div></C.SmallText>

        {/* 버튼 영역 */}
        <div style={{ marginTop: "20px", display: "flex", gap: 8 }}>
          <C.Button onClick={() => cameraInputRef.current.click()} disabled={isMatching}>
            카메라 시작
          </C.Button>
          <C.Button onClick={() => albumInputRef.current.click()} disabled={isMatching}>
            앨범에서 선택
          </C.Button>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={cameraInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={isMatching}
          />
          <input
            type="file"
            accept="image/*"
            ref={albumInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={isMatching}
          />
        </div>

        <C.ProfileImagePreview>
          {bodyImage ? (
            <img
              src={bodyImage}
              alt="OOTD 이미지"
              style={{
                width: "200px",
                height: "300px",
                objectFit: "contain",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            />
          ) : (
            <img
              src={smallPlus}
              alt="업로드 버튼"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          )}
        </C.ProfileImagePreview>

        <C.AnalyzeButton
          disabled={!bodyImage || isMatching}
          onClick={handleCalendarSubmit}
        >
          {isMatching ? "자동 매칭 중..." : "OOTD 등록하기"}
        </C.AnalyzeButton>
      </C.Container>
      <C.BottomBox><Footer /></C.BottomBox>

      {/* 🔹 전체 화면 로딩 모달 */}
      {isMatching && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            backdropFilter: "blur(2px)"
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "28px 32px",
              width: 320,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              textAlign: "center"
            }}
          >
            {/* 스피너 */}
            <div
              style={{
                width: 44,
                height: 44,
                margin: "0 auto 12px",
                border: "4px solid #e5e7eb",
                borderTop: "4px solid #CE9694",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }}
            />
            <div style={{ fontWeight: 700, marginBottom: 6 }}>자동 매칭 중</div>
            <div style={{ fontSize: 14, color: "#6b7280" }}>
              전신 사진에서 아이템을 감지하고<br />내 옷장과 매칭하는 중이에요… (최대 30초)
            </div>
          </div>

          {/* 스피너 애니메이션 */}
          <style>{`@keyframes spin { 0% { transform: rotate(0) } 100% { transform: rotate(360deg) } }`}</style>
        </div>
      )}
    </C.Background>
  );
}

export default CalendarCreate3;
