import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as MP from "../styles/MypageStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { useEffect, useState } from "react";

// 이미지 주소 넣는 곳
//메뉴 아이콘
import chartIcon from '../img/mypage_chart_icon.png';
import sizeIcon from '../img/mypage_size_icon.png';
import calendarIcon from '../img/mypage_calendar_icon.png';
import closetIcon from '../img/mypage_closet_icon.png';
import personIcon from '../img/mypage_person_icon.png';

//체형 이미지 
import round from '../img/bodyType_round.jpg';
import tri from '../img/bodyType_tri.jpg';
import square from '../img/bodyType_sq.jpg';
import invertTri from '../img/bodyType_invertTri.jpg';
import hour from '../img/bodyType_hour.jpg';

function Mypage() {
    const [nickname, setNickname] = useState('');
    const [bodyType, setBodyType] = useState('');

    useEffect(() => {


        //더미데이터 예시
        const dummyData = {
            nickname: '홍길동',
            bodyType: 'none'
        };
        setNickname(dummyData.nickname);
        setBodyType(dummyData.bodyType);

        // 예시 API 호출
        fetch('/api/user-profile') // 여기에 실제 백엔드 API URL을 넣어야 함
            .then(response => response.json())
            .then(data => {
                setNickname(data.nickname); // 응답에서 닉네임과 체형 정보를 받아옴
                setBodyType(data.bodyType);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <MP.Background>

            <MP.TopBox>
                <TopBar />
            </MP.TopBox>

            <MP.Container>
                <MP.Header>
                    <MP.Logo>FITZA</MP.Logo>
                    <MP.Title>마이페이지</MP.Title>
                </MP.Header>


                <MP.BodytypeBox>

                    <MP.BodytypeImage>
                        {/* 조건에 맞는 이미지 렌더링 */}
                        {bodyType === "round" && <img src={round} alt="round typess" />}
                        {bodyType === "tri" && <img src={tri} alt="triangle typess" />}
                        {bodyType === "square" && <img src={square} alt="square typess" />}
                        {bodyType === "invertTri" && <img src={invertTri} alt="inverse triangle typess" />}
                        {bodyType === "hour" && <img src={hour} alt="hourglass typess" />}
                    </MP.BodytypeImage>

                    <MP.BodytypeText>
                        {/* 조건에 맞는 텍스트를 다르게 표시 1 */}
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
                        {bodyType === "round" && <div style={{ fontSize: "12px", display: "flex" }}><p style={{ fontWeight: "bold", color: "brown" }}>{nickname}</p>님의 체형은 &nbsp;<p style={{ fontWeight: "bold", paddingBottom: "2px", color: "green" }}>라운드 체형</p>입니다.</div>}
                        {bodyType === "tri" && <div style={{ fontSize: "12px", display: "flex" }}><p style={{ fontWeight: "bold", color: "brown" }}>{nickname}</p>님의 체형은 &nbsp;<p style={{ fontWeight: "bold", paddingBottom: "2px", color: "green" }}>삼각형 체형</p>입니다.</div>}
                        {bodyType === "square" && <div style={{ fontSize: "12px", display: "flex" }}><p style={{ fontWeight: "bold", color: "brown" }}>{nickname}</p>님의 체형은 &nbsp;<p style={{ fontWeight: "bold", paddingBottom: "2px", color: "green" }}>사각형 체형</p>입니다.</div>}
                        {bodyType === "invertTri" && <div style={{ fontSize: "12px", display: "flex" }}><p style={{ fontWeight: "bold", color: "brown" }}>{nickname}</p>님의 체형은 &nbsp;<p style={{ fontWeight: "bold", paddingBottom: "2px", color: "green" }}>역삼각형 체형</p>입니다.</div>}
                        {bodyType === "hour" && <div style={{ fontSize: "12px", display: "flex" }}><p style={{ fontWeight: "bold", color: "brown" }}>{nickname}</p>님의 체형은 &nbsp;<p style={{ fontWeight: "bold", paddingBottom: "2px", color: "green" }}>모래시계 체형</p>입니다.</div>}
                        <div></div>

                        {/* 조건에 맞는 텍스트를 다르게 표시 3 */}
                        {bodyType === "round" && (
                            <div style={{ fontSize: "12px", paddingBottom: "2px" }}>
                                <div style={{ fontSize: "11px", lineHeight: "1.6" }}>
                                    라운드 체형은 복부와 상체 중심에 볼륨이 집중된 형태입니다.
                                    <br />👚 상의는 브이넥, 랩 스타일 등 목선을 드러내고 시선을 위로 끌어올릴 수 있는 디자인이 좋습니다.
                                    <br />🧥 허리를 강조하는 아우터나 벨트로 라인을 잡아주는 스타일을 추천합니다.
                                    <br />👖 하의는 어두운 컬러나 일자핏으로 깔끔한 실루엣을 연출하면 좋습니다.
                                    <br />💡 세로 라인을 강조하면 전체적으로 슬림해 보이는 효과가 있습니다.
                                </div>
                            </div>
                        )}
                        {bodyType === "tri" && (
                            <div style={{ fontSize: "12px", paddingBottom: "2px" }}>
                                <div style={{ fontSize: "11px", lineHeight: "1.6" }}>
                                    삼각형 체형에는 어깨가 좁고 하체가 상대적으로 넓은 특징이 있습니다.
                                    <br />👕 상의는 어깨를 넓어 보이게 하는 디자인이 좋습니다. 예를 들어, 어깨 패드가 있는 자켓이나 넓은 칼라가 있는 상의가 효과적입니다.
                                    <br />👖 하의는 다소 간결하고 깔끔한 스타일로, 너무 부풀지 않도록 피하는 것이 좋습니다.
                                    <br />💡 또한, 다리를 길어 보이게 할 수 있는 하이웨이스트 팬츠나 스커트를 선택하는 것도 좋은 방법입니다.
                                    <br />✨ 이런 스타일들은 전체적인 비율을 잘 맞춰주는 역할을 합니다.
                                </div>
                            </div>
                        )}

                        {bodyType === "square" && (
                            <div style={{ fontSize: "12px", paddingBottom: "2px" }}>
                                <div style={{ fontSize: "11px", lineHeight: "1.6" }}>
                                    사각형 체형은 어깨, 허리, 엉덩이 폭이 비슷해 직선적인 인상을 줍니다.
                                    <br />👚 곡선을 강조할 수 있는 프릴, 셔링 디테일의 상의가 효과적입니다.
                                    <br />🧥 허리 라인을 살려주는 자켓이나 벨트 활용도 좋습니다.
                                    <br />👗 A라인 스커트나 와이드 팬츠 등 하체에 볼륨감을 주는 스타일이 잘 어울립니다.
                                    <br />💡 전체적으로 곡선 실루엣을 살려주는 것이 포인트입니다.
                                </div>
                            </div>
                        )}

                        {bodyType === "invertTri" && (
                            <div style={{ fontSize: "12px", paddingBottom: "2px" }}>
                                <div style={{ fontSize: "11px", lineHeight: "1.6" }}>
                                    역삼각형 체형은 어깨가 넓고 하체가 상대적으로 좁은 형태입니다.
                                    <br />👚 상의는 브이넥이나 라운드넥 등 어깨 너비를 줄여 보이는 디자인이 좋습니다.
                                    <br />👗 A라인 스커트, 플레어 팬츠처럼 하체에 볼륨을 더해주는 아이템을 추천합니다.
                                    <br />👖 밝은 색상이나 디테일이 있는 하의는 시선을 분산시켜 밸런스를 맞춰줍니다.
                                    <br />🚫 어깨를 강조하는 퍼프 소매나 스퀘어넥은 피하는 것이 좋아요.
                                </div>
                            </div>
                        )}

                        {bodyType === "hour" && (
                            <div style={{ fontSize: "12px", paddingBottom: "2px" }}>
                                <div style={{ fontSize: "11px", lineHeight: "1.6" }}>
                                    모래시계 체형은 어깨와 엉덩이가 균형 있고 허리가 잘록한 이상적인 체형입니다.
                                    <br />👗 허리선을 강조하는 원피스나 투피스가 체형을 잘 살려줍니다.
                                    <br />👚 너무 루즈하지 않은 상의로 상체 실루엣을 살려주세요.
                                    <br />👖 하의는 하이웨이스트나 슬림핏 팬츠로 라인을 강조하면 더욱 돋보입니다.
                                    <br />✨ 다양한 스타일이 잘 어울리나, 허리 라인을 살리는 것이 핵심입니다.
                                </div>
                            </div>
                        )}
                    </MP.BodytypeText>
                </MP.BodytypeBox>

                <MP.ClickBox>
                    <MP.Click to="/statistic">
                        <img src={chartIcon} alt="통계 아이콘" style={{ width: '20px', height: '20px' }} /> 통계
                    </MP.Click>
                    <MP.Click to="/calendarpage">
                        <img src={calendarIcon} alt="캘린더 아이콘" style={{ width: '20px', height: '20px' }} /> 캘린더
                    </MP.Click>
                    <MP.Click to="/bodyshape">
                        <img src={sizeIcon} alt="체형측정 아이콘" style={{ width: '26px', height: '16px', transform: 'translateX(-5px)', marginRight: '5px' }} /> 체형측정
                    </MP.Click>
                    <MP.Click to="/sharecloset">
                        <img src={closetIcon} alt="공유옷장 아이콘" style={{ width: '20px', height: '20px' }} /> 공유 옷장
                    </MP.Click>
                    <MP.Click to="/person">
                        <img src={personIcon} alt="개인정보 아이콘" style={{ width: '20px', height: '18px' }} /> 개인정보
                    </MP.Click>
                </MP.ClickBox>
            </MP.Container>

            <MP.BottomBox>
                <Footer />
            </MP.BottomBox>
        </MP.Background >
    );
}

export default Mypage;
