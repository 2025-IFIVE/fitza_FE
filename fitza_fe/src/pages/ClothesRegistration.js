import React, { useRef, useState } from "react";
import * as C from "../styles/ClothesRegistrationStyle"; // 기존 ClothesRegistrationStyle 대신 BodyShapeStyle 사용
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { useNavigate } from "react-router-dom";
import smallPlus from '../img/cameraImage.png';
import backIcon from "../img/backButton.png";

function ClothesRegistration() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const cameraInputRef = useRef(null);
    const albumInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <C.Background>
            <C.TopBox><TopBar /></C.TopBox>
            <C.Container>
                <C.Header>
                    <C.Back onClick={() => navigate(-1)}>
                        <img src={backIcon} alt="back" />
                    </C.Back>
                    <C.Title>의류 등록</C.Title>
                </C.Header>

                <C.TitleBox1>
                    <C.Title1>나의 옷장을 채우기 위한 사진 등록</C.Title1>
                </C.TitleBox1>

                
                <C.LargeText><div>📷옷 사진을 찍어주세요📷</div></C.LargeText>
                <C.SmallText><div>깔끔한 배경에서 촬영하면 분석이 더 정확해집니다</div></C.SmallText>

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
                    disabled={!image}
                    onClick={() => {
                        if (image) {
                            console.log("의류 등록 처리 시작!");
                            // navigate("/register-success"); // 예시
                        }
                    }}
                >
                    의류 등록하기
                </C.AnalyzeButton>
            </C.Container>

            <C.BottomBox><Footer /></C.BottomBox>
        </C.Background>
    );
}

export default ClothesRegistration;
