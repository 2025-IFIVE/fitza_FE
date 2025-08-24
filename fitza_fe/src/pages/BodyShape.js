import React, { useState, useEffect, useRef } from "react";
import * as BS from "../styles/BodyShapeStyle";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { useNavigate } from "react-router-dom";
import smallPlus from '../img/cameraImage.png';
import backIcon from "../img/backButton.png";
import axios from "axios";

import round from '../img/bodyType_round.jpg';
import tri from '../img/bodyType_tri.jpg';
import square from '../img/bodyType_sq.jpg';
import invertTri from '../img/bodyType_invertTri.jpg';
import hour from '../img/bodyType_hour.jpg';

function BodyShape() {
  const navigate = useNavigate();
  const [bodyImage, setBodyImage] = useState(null);
  const [bodyShape, setBodyShape] = useState("");
  const [loading, setLoading] = useState(false);       // 🔹 로딩 모달 표시 기준
  const [selectedFile, setSelectedFile] = useState(null);

  const cameraInputRef = useRef(null);
  const albumInputRef = useRef(null);

  const normalizeBodyShape = (rawType) => {
    if (!rawType) return "";
    if (rawType.includes("모래시계")) return "hour";
    if (rawType.includes("역삼각")) return "invertTri";
    if (rawType.includes("삼각")) return "tri";
    if (rawType.includes("사각")) return "square";
    if (rawType.includes("라운드")) return "round";
    return "";
  };

  const bodyShapeTextMap = {
    round: "라운드 체형",
    tri: "삼각형 체형",
    square: "사각형 체형",
    invertTri: "역삼각형 체형",
    hour: "모래시계 체형"
  };

  const bodyShapeTips = {
    round: `라운드 체형은 복부와 상체 중심에 볼륨이 집중된 형태입니다.\n👚 상의는 브이넥, 랩 스타일 등 목선을 드러내고 시선을 위로 끌어올릴 수 있는 디자인이 좋습니다.\n🧥 허리를 강조하는 아우터나 벨트로 라인을 잡아주는 스타일을 추천합니다.\n👖 하의는 어두운 컬러나 일자핏으로 깔끔한 실루엣을 연출하면 좋습니다.\n💡 세로 라인을 강조하면 전체적으로 슬림해 보이는 효과가 있습니다.`,
    tri: `삼각형 체형에는 어깨가 좁고 하체가 상대적으로 넓은 특징이 있습니다.\n👕 상의는 어깨를 넓어 보이게 하는 디자인이 좋습니다. 예: 어깨 패드 있는 자켓, 넓은 칼라 상의.\n👖 하의는 간결하고 깔끔한 스타일로, 너무 부풀지 않도록 피합니다.\n💡 하이웨이스트 팬츠나 스커트로 다리를 길어 보이게 하는 것이 좋습니다.`,
    square: `사각형 체형은 어깨, 허리, 엉덩이 폭이 비슷해 직선적인 인상을 줍니다.\n👚 곡선을 강조할 수 있는 프릴, 셔링 디테일의 상의가 효과적입니다.\n🧥 허리 라인을 살려주는 자켓이나 벨트를 활용하세요.\n👗 A라인 스커트나 와이드 팬츠로 하체에 볼륨감을 줄 수 있습니다.`,
    invertTri: `역삼각형 체형은 어깨가 넓고 하체가 상대적으로 좁은 형태입니다.\n👚 어깨 너비를 줄여 보이는 브이넥, 라운드넥 상의가 적합합니다.\n👗 A라인 스커트, 플레어 팬츠 등 하체에 볼륨을 주는 아이템을 추천합니다.\n👖 밝은 색상 하의나 디테일 있는 하의로 시선을 분산시키세요.\n🚫 퍼프 소매, 스퀘어넥 등 어깨 강조 옷은 피하세요.`,
    hour: `모래시계 체형은 어깨와 엉덩이가 균형 있고 허리가 잘록한 이상적인 체형입니다.\n👗 허리선을 강조하는 원피스나 투피스가 잘 어울립니다.\n👚 상체 실루엣을 살리는 적당히 핏된 상의를 추천합니다.\n👖 하이웨이스트 또는 슬림핏 팬츠로 라인을 강조하면 더욱 돋보입니다.`
  };

  const getBodyImageByType = (type) => {
    if (type === "hour") return hour;
    if (type === "invertTri") return invertTri;
    if (type === "tri") return tri;
    if (type === "square") return square;
    if (type === "round") return round;
    return null;
  };

  const [normalizedType, setNormalizedType] = useState("");

  useEffect(() => {
    const fetchBodyShape = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${process.env.REACT_APP_API}/api/body/info`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.status === 200) {
          setBodyShape(res.data.data);
          setNormalizedType(normalizeBodyShape(res.data.data));
        }
      } catch (err) {
        console.log("체형 정보 없음 또는 오류:", err);
      }
    };
    fetchBodyShape();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setBodyImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("이미지를 먼저 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true); // 🔹 로딩 시작
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`${process.env.REACT_APP_API}/api/body/analyze`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.status === 200) {
        setBodyShape(res.data.data);
        setNormalizedType(normalizeBodyShape(res.data.data));
      }
    } catch (error) {
      console.error("분석 실패:", error?.response || error);
      alert("체형 분석에 실패했습니다. (서버 오류)");
    } finally {
      setLoading(false); // 🔹 로딩 종료
    }
  };

  const handleBack = () => {
    if (loading) return; // 로딩 중 뒤로가기 차단
    navigate(-1);
  };

  return (
    <BS.Background>
      <BS.TopBox><TopBar /></BS.TopBox>

      {/* 로딩 중엔 전체 입력 비활성화 + 살짝 페이드 */}
      <BS.Container style={{ pointerEvents: loading ? "none" : "auto", opacity: loading ? 0.95 : 1 }}>
        <BS.Header>
          <BS.Back onClick={handleBack} style={{ opacity: loading ? 0.5 : 1 }}>
            <img src={backIcon} alt="back" />
          </BS.Back>
          <BS.Title>체형 정보</BS.Title>
        </BS.Header>

        {!bodyShape && (
          <>
            <BS.TitleBox1><BS.Title1>체형 분석을 위한 사진 촬영</BS.Title1></BS.TitleBox1>
            <BS.LargeText><div>⚠️아직 체형 정보가 없습니다⚠️</div></BS.LargeText>
            <BS.SmallText><div>체형을 분석하기 위해 전신 사진을 찍어주세요</div></BS.SmallText>
            <BS.LargeText><div>📷전신 사진을 찍어주세요📷</div></BS.LargeText>
            <BS.SmallText><div>팔을 살짝 벌려서 찍으면 더 정확한 분류를 진행할 수 있습니다</div></BS.SmallText>
          </>
        )}

        <div style={{ marginTop: "20px", display: "flex", gap: 8 }}>
          <BS.Button onClick={() => cameraInputRef.current.click()} disabled={loading}>카메라 시작</BS.Button>
          <BS.Button onClick={() => albumInputRef.current.click()} disabled={loading}>앨범에서 선택</BS.Button>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={cameraInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={loading}
          />
          <input
            type="file"
            accept="image/*"
            ref={albumInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={loading}
          />
        </div>

        <BS.ProfileImagePreview>
          {bodyImage ? (
            <img className="analyzed" src={bodyImage} alt="체형 이미지" />
          ) : (
            <img className="placeholder" src={smallPlus} alt="업로드 버튼" />
          )}
        </BS.ProfileImagePreview>

        <BS.AnalyzeButton disabled={!bodyImage || loading} onClick={handleAnalyze}>
          {loading ? "분석 중..." : "체형 분석하기"}
        </BS.AnalyzeButton>

        {/* 결과 카드 UI */}
        {normalizedType && (
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
              marginTop: "30px",
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "white",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
              fontFamily: "nanumSquare",
              border: "2px solid  #916b5d",
              fontSize: "13px",
              color: "#333",
              lineHeight: 1.6,
              maxWidth: "400px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <img
              src={getBodyImageByType(normalizedType)}
              alt="체형 이미지"
              style={{ width: "140px", borderRadius: "10px", flexShrink: 0 }}
            />
            <div style={{ whiteSpace: "pre-line" }}>
              <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>
                ✨ {bodyShapeTextMap[normalizedType]} 추천 스타일
              </div>
              {bodyShapeTips[normalizedType]}
            </div>
          </div>
        )}
      </BS.Container>

      <BS.BottomBox><Footer /></BS.BottomBox>

      {/* 🔹 전체 화면 로딩 모달 */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "28px 32px",
              width: 320,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              textAlign: "center",
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
                animation: "spin 1s linear infinite",
              }}
            />
            <div style={{ fontWeight: 700, marginBottom: 6 }}>체형 분석 중</div>
            <div style={{ fontSize: 14, color: "#6b7280" }}>
              전신 이미지를 분석하고 체형을 분류하는 중이에요… (약 20초)
            </div>
          </div>

          {/* 스피너 애니메이션 */}
          <style>{`@keyframes spin { 0% { transform: rotate(0) } 100% { transform: rotate(360deg) } }`}</style>
        </div>
      )}
    </BS.Background>
  );
}

export default BodyShape;
