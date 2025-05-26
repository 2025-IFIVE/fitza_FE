import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as MP from "../styles/MypageStyle";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';

import chartIcon from '../img/mypage_chart_icon.png';
import sizeIcon from '../img/mypage_size_icon.png';
import calendarIcon from '../img/mypage_calendar_icon.png';
import closetIcon from '../img/mypage_closet_icon.png';
import personIcon from '../img/mypage_person_icon.png';

import round from '../img/bodyType_round.jpg';
import tri from '../img/bodyType_tri.jpg';
import square from '../img/bodyType_sq.jpg';
import invertTri from '../img/bodyType_invertTri.jpg';
import hour from '../img/bodyType_hour.jpg';

function Mypage() {
    const [nickname, setNickname] = useState('');
    const [bodyType, setBodyType] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            console.error("로그인 토큰이 없습니다.");
            return;
        }

        // 🔹 닉네임 가져오기
        fetch("http://localhost:8080/mypage", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const nicknameValue = data?.data?.nickname;
                if (typeof nicknameValue === "string") {
                    setNickname(nicknameValue);
                } else {
                    setNickname("이름없음");
                }
            })
            .catch(error => {
                console.error("닉네임 가져오기 실패:", error);
                setNickname("오류");
            });

        // 🔹 체형 정보 가져오기 (수정된 부분)
        fetch("http://localhost:8080/api/body/info", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const bodyTypeStr = data?.data;  // ← 여기 고쳤습니다!
                if (typeof bodyTypeStr !== "string") {
                    setBodyType("none");
                    return;
                }

                let mapped = "none";
                if (bodyTypeStr.includes("모래시계")) mapped = "hour";
                else if (bodyTypeStr.includes("역삼각")) mapped = "invertTri";
                else if (bodyTypeStr.includes("삼각")) mapped = "tri";
                else if (bodyTypeStr.includes("사각")) mapped = "square";
                else if (bodyTypeStr.includes("라운드")) mapped = "round";

                setBodyType(mapped);
            })
            .catch(error => {
                console.error("체형 정보 가져오기 실패:", error);
                setBodyType("none");
            });
    }, []);

    return (
        <MP.Background>
            <MP.TopBox><TopBar /></MP.TopBox>

            <MP.Container>
                <MP.Header>
                    <MP.Logo>FITZA</MP.Logo>
                    <MP.Title>마이페이지</MP.Title>
                </MP.Header>

                <MP.BodytypeBox>
                    <MP.BodytypeImage>
                        {bodyType === "round" && <img src={round} alt="round" />}
                        {bodyType === "tri" && <img src={tri} alt="triangle" />}
                        {bodyType === "square" && <img src={square} alt="square" />}
                        {bodyType === "invertTri" && <img src={invertTri} alt="invert triangle" />}
                        {bodyType === "hour" && <img src={hour} alt="hourglass" />}
                    </MP.BodytypeImage>

                    <MP.BodytypeText>
                        {bodyType === "none" && (
                            <div style={{ fontSize: "12px", lineHeight: "1.6", color: "#555" }}>
                                <p><strong>{nickname}</strong>님의 체형 정보가 등록되지 않았습니다.</p>
                                <p>체형 측정 후 스타일 추천을 받아보세요!</p>
                                <p>
                                    <Link to="/bodyshape" style={{ color: "black", fontSize: "18px" }}>
                                        체형 측정하러 가기 ▶️▶️
                                    </Link>
                                </p>
                            </div>
                        )}
                        {bodyType === "round" && (
                            <div style={{ fontSize: "12px", display: "flex" }}>
                                <p style={{ fontWeight: "bold", color: "brown" }}>{nickname}</p>님의 체형은&nbsp;
                                <p style={{ fontWeight: "bold", color: "green" }}>라운드 체형</p>입니다.
                            </div>
                        )}
                        {bodyType === "tri" && (
                            <div style={{ fontSize: "12px", display: "flex" }}>
                                <p style={{ fontWeight: "bold", color: "brown" }}>{nickname}</p>님의 체형은&nbsp;
                                <p style={{ fontWeight: "bold", color: "green" }}>삼각형 체형</p>입니다.
                            </div>
                        )}
                        {bodyType === "square" && (
                            <div style={{ fontSize: "12px", display: "flex" }}>
                                <p style={{ fontWeight: "bold", color: "brown" }}>{nickname}</p>님의 체형은&nbsp;
                                <p style={{ fontWeight: "bold", color: "green" }}>사각형 체형</p>입니다.
                            </div>
                        )}
                        {bodyType === "invertTri" && (
                            <div style={{ fontSize: "12px", display: "flex" }}>
                                <p style={{ fontWeight: "bold", color: "brown" }}>{nickname}</p>님의 체형은&nbsp;
                                <p style={{ fontWeight: "bold", color: "green" }}>역삼각형 체형</p>입니다.
                            </div>
                        )}
                        {bodyType === "hour" && (
                            <div style={{ fontSize: "12px", display: "flex" }}>
                                <p style={{ fontWeight: "bold", color: "brown" }}>{nickname}</p>님의 체형은&nbsp;
                                <p style={{ fontWeight: "bold", color: "green" }}>모래시계 체형</p>입니다.
                            </div>
                        )}
                    </MP.BodytypeText>
                </MP.BodytypeBox>

                <MP.ClickBox>
                    <MP.Click to="/statistic">
                        <img src={chartIcon} alt="통계" style={{ width: '20px', height: '20px' }} /> 통계
                    </MP.Click>
                    <MP.Click to="/calendarpage">
                        <img src={calendarIcon} alt="캘린더" style={{ width: '20px', height: '20px' }} /> 캘린더
                    </MP.Click>
                    <MP.Click to="/bodyshape">
                        <img src={sizeIcon} alt="체형측정" style={{ width: '26px', height: '16px', transform: 'translateX(-5px)', marginRight: '5px' }} /> 체형측정
                    </MP.Click>
                    <MP.Click to="/sharecloset">
                        <img src={closetIcon} alt="공유옷장" style={{ width: '20px', height: '20px' }} /> 공유 옷장
                    </MP.Click>
                    <MP.Click to="/person">
                        <img src={personIcon} alt="개인정보" style={{ width: '20px', height: '18px' }} /> 개인정보
                    </MP.Click>
                </MP.ClickBox>
            </MP.Container>

            <MP.BottomBox>
                <Footer />
            </MP.BottomBox>
        </MP.Background>
    );
}

export default Mypage;
