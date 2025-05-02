import React, { useState, useEffect } from "react";
import * as BS from "../styles/BodyShapeStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/cameraImage.png';
import axios from 'axios';


// 이미지 주소
import backIcon from "../img/backButton.png";


function BodyShape() {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);  // 이전 페이지로 이동
    };

    const [bodyImage, setBodyImage] = useState(null); // 올바른 변수명

    return (
        <BS.Background>
            <BS.TopBox>
                <TopBar />
            </BS.TopBox>

            <BS.Container>
                <BS.Header>
                    <BS.Back onClick={handleBackClick}>
                        <img src={backIcon} alt="back" />
                    </BS.Back>
                    <BS.Title>체형 정보</BS.Title>
                </BS.Header>
                <BS.TitleBox1>
                    <BS.Title1>체형 분석을 위한 사진 촬영</BS.Title1>
                </BS.TitleBox1>

                <BS.LargeText >
                    <div>⚠️아직 체형 정보가 없습니다⚠️</div>
                </BS.LargeText>
                <BS.SmallText >
                    <div>체형을 분석하기 위해 전신 사진을 찍어주세요</div>
                </BS.SmallText>
                <BS.LargeText >
                    <div>📷전신 사진을 찍어주세요📷</div>
                </BS.LargeText>
                <BS.SmallText >
                    <div>팔을 살짝 벌려서 찍으면 더 정확한 분류를 진행할 수 있습니다</div>
                </BS.SmallText>

                <BS.ProfileImagePreview>
                    <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
                        {bodyImage ? (
                            <img
                                src={bodyImage}
                                alt="프로필 이미지"
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
                </BS.ProfileImagePreview>
                <BS.AnalyzeButton
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
                </BS.AnalyzeButton>
            </BS.Container >

            <BS.BottomBox>
                <Footer />
            </BS.BottomBox>

        </BS.Background >
    );
}

export default BodyShape;
