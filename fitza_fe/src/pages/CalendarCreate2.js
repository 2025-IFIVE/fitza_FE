import React, { useState, useEffect } from "react";
import * as C from "../styles/CalendarCreate2Style";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/cameraImage.png';
import axios from 'axios';


// 이미지 주소
import backIcon from "../img/backButton.png";


function CalendarCreate2() {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);  // 이전 페이지로 이동
    };

    const [bodyImage, setBodyImage] = useState(null); // 올바른 변수명

    return (
        <C.Background>
            <C.TopBox>
                <TopBar />
            </C.TopBox>

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

                <C.LargeText >
                    <div>⚠️아직 등록된 OOTD 사진이 없습니다⚠️</div>
                </C.LargeText>
                <C.SmallText >
                    <div>캘린더에 OOTD를 등록하기 위해 전신 사진을 찍어주세요</div>
                </C.SmallText>
                <C.LargeText >
                    <div>📷전신 사진을 찍어주세요📷</div>
                </C.LargeText>
                <C.SmallText >
                    <div>보다 정확한 자동 매칭을 위해 좋은 사진을 넣어라</div>
                </C.SmallText>

                <C.ProfileImagePreview>
                    <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
                        {bodyImage ? (
                            <img
                                src={bodyImage}
                                alt="OOTD 이미지"
                                style={{
                                    width: "200px",
                                    height: "300px",
                                    objectFit: "contain",
                                    borderRadius: "10px",
                                }}
                            />
                        ) : (
                            <img
                                src={smallPlus}
                                alt="업로드 버튼"
                                style={{ width: "100px", height: "100px" }}
                            />
                        )}
                    </label>

                    <input
                        id="upload-image"
                        type="file"
                        accept="image/*"
                        capture="environment" // 모바일에서 바로 카메라 실행됨
                        style={{ display: "none" }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setBodyImage(reader.result); // base64 이미지 설정
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                </C.ProfileImagePreview>
                <C.AnalyzeButton
                    disabled={!bodyImage} // 이미지 없으면 비활성화
                    onClick={() => {
                        if (bodyImage) {
                            // TODO: 여기에 체형 분석 요청 API 호출 또는 페이지 이동 로직 추가
                            console.log("체형 분석 시작!");
                            // 예시: navigate("/analyze-result");
                        }
                    }}
                >
                    체형 분석하기
                </C.AnalyzeButton>
            </C.Container >

            <C.BottomBox>
                <Footer />
            </C.BottomBox>

        </C.Background >
    );
}

export default CalendarCreate2;
