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
    const [imageFile, setImageFile] = useState(null); // 🔹 File 객체 추가

    const cameraInputRef = useRef(null);
    const albumInputRef = useRef(null);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // 🔸 File 객체 저장
            const reader = new FileReader();
            reader.onloadend = () => {
                setBodyImage(reader.result);
            };
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

        // ✅ 1. 오늘 날짜를 yyyy-mm-dd 형식으로 구하기
        const today = new Date();
        const formattedToday = today.toISOString().slice(0, 10); // 예: '2025-06-02'

        try {
            // ✅ 2. 이미 등록된 코디들 가져오기
            const res = await axios.get(`${process.env.REACT_APP_API}/api/coordination/my`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const alreadyExists = res.data.some(item => item.date === formattedToday);
            if (alreadyExists) {
                alert("⚠️ 오늘 이미 등록된 코디가 있습니다!\n캘린더에서 해당 코디를 수정하거나 날짜를 변경해주세요.");
                return;
            }

            // ✅ 3. 백엔드로 이미지 전송 → 매칭 요청
            const formData = new FormData();
            formData.append("file", imageFile);

            const matchRes = await axios.post(`${process.env.REACT_APP_API}/api/match/ootd`, formData, {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = matchRes.data;

            navigate("/CalendarCreate", {
                state: {
                    matchedImages: data.matchedImages,
                    labels: data.labels,
                    scores: data.scores,
                }
            });

        } catch (error) {
            console.error("❌ 매칭 실패 또는 중복 검사 실패:", error.response || error);
            alert("옷 매칭 또는 등록 확인 중 오류가 발생했습니다.");
        }
    };


    return (
        <C.Background>
            <C.TopBox><TopBar /></C.TopBox>
            <C.Container>
                <C.Header>
                    <C.Back onClick={handleBackClick}>
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
                <div style={{ marginTop: "20px" }}>
                    <C.Button onClick={() => cameraInputRef.current.click()}>카메라 시작</C.Button>
                    <C.Button onClick={() => albumInputRef.current.click()}>앨범에서 선택</C.Button>

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
                    disabled={!bodyImage}
                    onClick={handleCalendarSubmit} // 🔸 매칭 함수 호출
                >
                    OOTD 등록하기
                </C.AnalyzeButton>
            </C.Container>
            <C.BottomBox><Footer /></C.BottomBox>
        </C.Background>
    );
}

export default CalendarCreate3;
