import React, { useState, useRef } from "react";
import * as C from "../styles/CalendarCreate2Style";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { useNavigate } from "react-router-dom";
import smallPlus from '../img/cameraImage.png';


// 이미지 주소
import backIcon from "../img/backButton.png";

function CalendarCreate2() {
    const navigate = useNavigate();
    const [bodyImage, setBodyImage] = useState(null);

    const cameraInputRef = useRef(null);
    const albumInputRef = useRef(null);

    const handleBackClick = () => {
        navigate(-1); // 이전 페이지로 이동
    };
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBodyImage(reader.result);
            };
            reader.readAsDataURL(file);
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
                    onClick={() => {
                        if (bodyImage) {
                            console.log("체형 분석 시작!");
                            // navigate("/analyze-result");
                        }
                    }}
                >
                    캘린더 등록하기
                </C.AnalyzeButton>
            </C.Container>
            <C.BottomBox><Footer /></C.BottomBox>
        </C.Background>
    );
}

export default CalendarCreate2;
