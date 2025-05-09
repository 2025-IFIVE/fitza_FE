import React, { useState, useRef } from "react";
import * as BS from "../styles/BodyShapeStyle";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { useNavigate } from "react-router-dom";
import smallPlus from '../img/cameraImage.png';
import backIcon from "../img/backButton.png";

function BodyShape() {
    const navigate = useNavigate();
    const [bodyImage, setBodyImage] = useState(null);

    const cameraInputRef = useRef(null);
    const albumInputRef = useRef(null);

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
        <BS.Background>
            <BS.TopBox><TopBar /></BS.TopBox>
            <BS.Container>
                <BS.Header>
                    <BS.Back onClick={() => navigate(-1)}>
                        <img src={backIcon} alt="back" />
                    </BS.Back>
                    <BS.Title>체형 정보</BS.Title>
                </BS.Header>

                <BS.TitleBox1><BS.Title1>체형 분석을 위한 사진 촬영</BS.Title1></BS.TitleBox1>

                <BS.LargeText><div>⚠️아직 체형 정보가 없습니다⚠️</div></BS.LargeText>
                <BS.SmallText><div>체형을 분석하기 위해 전신 사진을 찍어주세요</div></BS.SmallText>
                <BS.LargeText><div>📷전신 사진을 찍어주세요📷</div></BS.LargeText>
                <BS.SmallText><div>팔을 살짝 벌려서 찍으면 더 정확한 분류를 진행할 수 있습니다</div></BS.SmallText>

                {/* 버튼 영역 */}
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

                {/* 이미지 미리보기 */}
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
                    disabled={!bodyImage}
                    onClick={() => {
                        if (bodyImage) {
                            console.log("체형 분석 시작!");
                            // navigate("/analyze-result");
                        }
                    }}
                >
                    체형 분석하기
                </BS.AnalyzeButton>
            </BS.Container>

            <BS.BottomBox><Footer /></BS.BottomBox>
        </BS.Background>
    );
}

export default BodyShape;
