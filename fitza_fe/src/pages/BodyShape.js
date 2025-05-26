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
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const cameraInputRef = useRef(null);
    const albumInputRef = useRef(null);

    const bodyShapeInfo = {
        "모래시계형": {
            desc: "어깨와 엉덩이의 비율이 비슷하고 허리가 잘록한 체형입니다.",
            tops: "허리를 강조하는 크롭탑, 랩 블라우스",
            bottoms: "하이웨이스트 팬츠, 플레어 스커트",
            avoid: "너무 헐렁한 상의, 스트레이트핏 하의"
        },
        "역삼각형": {
            desc: "어깨가 넓고 엉덩이가 좁은 체형입니다.",
            tops: "V넥, 슬리브리스 등 어깨를 좁아 보이게 하는 상의",
            bottoms: "플레어스커트, 와이드팬츠",
            avoid: "퍼프소매, 어깨패드 등 어깨 강조 아이템"
        },
        "삼각형": {
            desc: "하체가 상체보다 큰 체형입니다.",
            tops: "밝은색 상의, 어깨에 볼륨감을 주는 디자인",
            bottoms: "다크톤 슬랙스, 스트레이트 핏 팬츠",
            avoid: "밝은색 바지, 타이트한 하의"
        },
        "사각형": {
            desc: "허리와 어깨, 엉덩이의 비율이 유사한 직선형 체형입니다.",
            tops: "프릴, 셔링 등 디테일이 있는 상의",
            bottoms: "A라인 스커트, 하이웨이스트 팬츠",
            avoid: "일자핏 원피스, 박시한 옷"
        },
        "라운드형": {
            desc: "복부와 가슴에 볼륨이 있고 허리 라인이 없는 체형입니다.",
            tops: "루즈핏 상의, 언밸런스 헴라인",
            bottoms: "스트레이트 팬츠, 복부 커버 가능한 하의",
            avoid: "타이트한 상의, 허리 강조 옷"
        }
    };
    const normalizeBodyShape = (rawType) => {
        if (!rawType) return "";
        if (rawType.includes("모래시계")) return "모래시계형";
        if (rawType.includes("역삼각")) return "역삼각형";
        if (rawType.includes("삼각")) return "삼각형";
        if (rawType.includes("사각")) return "사각형";
        if (rawType.includes("라운드")) return "라운드형";
        return "";
    };
    const normalized = normalizeBodyShape(bodyShape);

    const getBodyImageByType = (type) => {
        if (type.includes("모래시계")) return hour;
        if (type.includes("역삼각")) return invertTri;
        if (type.includes("삼각")) return tri;
        if (type.includes("사각")) return square;
        if (type.includes("라운드")) return round;
        return null;
    };

    useEffect(() => {
        const fetchBodyShape = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const res = await axios.get("http://localhost:8080/api/body/info", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.data.status === 200) {
                    setBodyShape(res.data.data);
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
            reader.onloadend = () => {
                setBodyImage(reader.result);
            };
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
            setLoading(true);
            const token = localStorage.getItem("authToken");
            const res = await axios.post("http://localhost:8080/api/body/analyze", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // axios가 자동으로 처리하므로 Content-Type 명시 X
                }
            });

            if (res.data.status === 200) {
                setBodyShape(res.data.data);
            } else {
                console.error("분석 실패 응답:", res.data);
                alert("체형 분석에 실패했습니다.");
            }
        } catch (error) {
            console.error("분석 실패:", error.response || error);
            alert("체형 분석에 실패했습니다. (서버 오류)");
        } finally {
            setLoading(false);
        }
    };

    return (
        <BS.Background>
            <BS.TopBox><TopBar /></BS.TopBox>
            <BS.Container>
                <BS.Header>
                    <BS.Back onClick={() => navigate(-1)}>
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

                <div style={{ marginTop: "20px" }}>
                    <BS.Button onClick={() => cameraInputRef.current.click()}>카메라 시작</BS.Button>
                    <BS.Button onClick={() => albumInputRef.current.click()}>앨범에서 선택</BS.Button>

                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        ref={cameraInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={albumInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>

                <BS.ProfileImagePreview>
                    {bodyImage ? (
                        <img
                            src={bodyImage}
                            alt="체형 이미지"
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
                </BS.ProfileImagePreview>

                <BS.AnalyzeButton
                    disabled={!bodyImage || loading}
                    onClick={handleAnalyze}
                >
                    {loading ? "분석 중..." : "체형 분석하기"}
                </BS.AnalyzeButton>

                {/* 결과 카드 UI */}
                {bodyShape && (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        marginTop: "30px",
                        padding: "20px",
                        borderRadius: "15px",
                        backgroundColor: "#fefcf8",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        maxWidth: "600px",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>
                        <img
                            src={getBodyImageByType(bodyShape)}
                            alt="체형 결과"
                            style={{
                                width: "100px",
                                height: "200px",
                                borderRadius: "10px",
                                objectFit: "cover"
                            }}
                        />
                        <div style={{ textAlign: "left", flex: 1 }}>
                            <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
                                {bodyShape}
                            </div>
                            <div style={{ marginBottom: "10px", color: "#444" }}>
                                {bodyShapeInfo[normalized]?.desc}
                            </div>
                            <ul style={{ fontSize: "14px", paddingLeft: "16px", color: "#555" }}>
                                <li><strong>어울리는 상의:</strong> {bodyShapeInfo[normalized]?.tops}</li>
                                <li><strong>어울리는 하의:</strong> {bodyShapeInfo[normalized]?.bottoms}</li>
                                <li><strong>피해야 하는 스타일:</strong> {bodyShapeInfo[normalized]?.avoid}</li>
                            </ul>
                        </div>
                    </div>
                )}


            </BS.Container>
            <BS.BottomBox><Footer /></BS.BottomBox>
        </BS.Background>
    );
}

export default BodyShape;
