import React, { useRef, useState } from "react";
import * as C from "../styles/ShoesHatsStyle";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { useNavigate } from "react-router-dom";
import smallPlus from '../img/cameraImage.png';
import backIcon from "../img/backButton.png";

function ShoesHats() {
    const navigate = useNavigate();
    const [itemImage, setItemImage] = useState(null);

    const cameraInputRef = useRef(null);
    const albumInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setItemImage(reader.result);
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
                    <C.Title>잡화 등록</C.Title>
                </C.Header>

                <C.TitleBox1>
                    <C.Title1>모자 또는 신발을 등록하기 위한 사진 선택</C.Title1>
                </C.TitleBox1>

                <C.LargeText><div>📷잡화 사진을 찍어주세요📷</div></C.LargeText>
                <C.SmallText><div>하얀 배경에서 정면으로 촬영하면 더 정확해요</div></C.SmallText>

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
                    {itemImage ? (
                        <img
                            src={itemImage}
                            alt="잡화 이미지"
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
                    disabled={!itemImage}
                    onClick={() => {
                        if (itemImage) {
                            console.log("잡화 등록 처리 시작!");
                            // navigate("/register-accessories"); // 예시
                        }
                    }}
                >
                    잡화 등록하기
                </C.AnalyzeButton>
            </C.Container>

            <C.BottomBox><Footer /></C.BottomBox>
        </C.Background>
    );
}

export default ShoesHats;
