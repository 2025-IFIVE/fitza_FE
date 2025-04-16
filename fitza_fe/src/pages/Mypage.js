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
            bodyType: 'tri',
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
                        {bodyType === "round" && <div>{nickname}님의 체형은 라운드 체형입니다.</div>}
                        {bodyType === "tri" && <div>{nickname}님의 체형은 삼각형 체형입니다.</div>}
                        {bodyType === "square" && <div>{nickname}님의 체형은 사각형형 체형입니다.</div>}
                        {bodyType === "invertTri" && <div>{nickname}님의 체형은 역삼각형형 체형입니다.</div>}
                        {bodyType === "hour" && <div>{nickname}님의 체형은 모래시계 체형입니다.</div>}
                        <div></div>

                        {/* 조건에 맞는 텍스트를 다르게 표시 3 */}
                        {bodyType === "round" && <div>라운드 체형: </div>}
                        {bodyType === "tri" && <div>삼각형 체형: </div>}
                        {bodyType === "square" && <div>사각형 체형: </div>}
                        {bodyType === "invertTri" && <div>역삼각형 체형: </div>}
                        {bodyType === "hour" && <div>모래시계 체형: </div>}
                        <div></div>

                        {/* 조건에 맞는 텍스트를 다르게 표시 3 */}
                        {bodyType === "round" && <div>라운드 체형에 어울리는 추천 스타일</div>}
                        {bodyType === "tri" && <div>삼각형 체형에 어울리는 추천 스타일</div>}
                        {bodyType === "square" && <div>사각형 체형에 어울리는 추천 스타일</div>}
                        {bodyType === "invertTri" && <div>역삼각형 어울리는 추천 스타일</div>}
                        {bodyType === "hour" && <div>시계태엽 체형에 어울리는 추천 스타일</div>}
                    </MP.BodytypeText>
                </MP.BodytypeBox>

                <MP.ClickBox>
                    <MP.Click to="/statistic">
                        <img src={chartIcon} alt="통계 아이콘" style={{ width: '20px', height: '20px' }} /> 통계
                    </MP.Click>
                    <MP.Click to="/calendarpage">
                        <img src={calendarIcon} alt="캘린더 아이콘" style={{ width: '20px', height: '20px' }} /> 캘린더
                    </MP.Click>
                    <MP.Click to="/size">
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
