import React, { useRef, useState } from "react";
import * as C from "../styles/ClothesRegistrationStyle";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { useNavigate } from "react-router-dom";
import smallPlus from '../img/cameraImage.png';
import backIcon from "../img/backButton.png";
import { normalizeAbsoluteUrl } from "../utils/url";

function ClothesRegistration() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // 실제 파일 저장
  const [isMatching, setIsMatching] = useState(false); // 🔹 로딩 모달 상태

  const cameraInputRef = useRef(null);
  const albumInputRef = useRef(null);

  const handleBack = () => {
    if (isMatching) return;      // 로딩 중 뒤로가기 차단
    navigate(-1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // 파일 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // 프리뷰용
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      setIsMatching(true); // 🔹 로딩 시작

      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.REACT_APP_API}/api/clothing/upload`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`업로드 실패: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ 업로드 성공:", result);

      // 업로드 & 분류 완료 후 이동 (언마운트로 모달 자동 종료)
      navigate("/MyCloset_3", {
        state: {
          id: result.clothid,
          //imageSrc: `${process.env.REACT_APP_API}${result.imagePath || result.image_path}`,
          imageSrc: normalizeAbsoluteUrl(
            result.imageUrl || result.image_url || result.imagePath || result.image_path,
            process.env.REACT_APP_API
          ),
          category: result.category,
          type: result.type,           // ✅ type도 함께 넘기기
          clothId: result.clothid,     // ✅ id와 함께 clothId도 넘기기 (MyCloset_3에서 사용)
          clothData: result            // ✅ 전체 데이터 전달
        }
      });

    } catch (error) {
      console.error("❌ 업로드 에러:", error);
      alert("의류 업로드/분석 중 오류가 발생했습니다.");
      setIsMatching(false); // 실패 시 모달 종료
    }
  };

  return (
    <C.Background>
      <C.TopBox><TopBar /></C.TopBox>

      <C.Container style={{ pointerEvents: isMatching ? "none" : "auto", opacity: isMatching ? 0.95 : 1 }}>
        <C.Header>
          <C.Back onClick={handleBack} style={{ opacity: isMatching ? 0.5 : 1 }}>
            <img src={backIcon} alt="back" />
          </C.Back>
          <C.Title>의류 등록</C.Title>
        </C.Header>

        <C.TitleBox1>
          <C.Title1>나의 옷장을 채우기 위한 사진 등록</C.Title1>
        </C.TitleBox1>

        <C.LargeText><div>📷옷 사진을 찍어주세요📷</div></C.LargeText>
        <C.SmallText><div>깔끔한 배경에서 촬영하면 분석이 더 정확해집니다</div></C.SmallText>

        <div style={{ marginTop: "20px", display: "flex", gap: 8 }}>
          <C.Button onClick={() => cameraInputRef.current.click()} disabled={isMatching}>카메라 시작</C.Button>
          <C.Button onClick={() => albumInputRef.current.click()} disabled={isMatching}>앨범에서 선택</C.Button>

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
          {image ? (
            <img
              src={image}
              alt="의류 이미지"
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
          disabled={!image || isMatching}
          onClick={handleUpload}
        >
          {isMatching ? "의류 분석 중..." : "의류 등록하기"}
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
            <div style={{ fontWeight: 700, marginBottom: 6 }}>의류 분석 중</div>
            <div style={{ fontSize: 14, color: "#6b7280" }}>
              이미지를 업로드하고 속성을 분석하는 중이에요… (최대 30초)
            </div>
          </div>

          {/* 스피너 애니메이션 */}
          <style>{`@keyframes spin { 0% { transform: rotate(0) } 100% { transform: rotate(360deg) } }`}</style>
        </div>
      )}
    </C.Background>
  );
}

export default ClothesRegistration;
