import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as SC from "../styles/ShareClosetStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { useEffect, useState } from "react";
import axios from 'axios';

// 이미지 주소 넣는 곳
//메뉴 아이콘
import backIcon from '../img/backButton.png';
import friends from '../img/shareClosetPage_friends.png';

function ShareCloset() {
    //닉네임과 체형 정보 관리리
    const [nickname, setNickname] = useState('');
    const [bodyType, setBodyType] = useState('');

    useEffect(() => {
        // 예시 API 호출
        fetch('/api/user-profile') // 여기에 실제 백엔드 API URL을 넣어야 함
            .then(response => response.json())
            .then(data => {
                setNickname(data.nickname); // 응답에서 닉네임과 체형 정보를 받아옴
                setBodyType(data.bodyType);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    // 방문자 수 상태 관리
    const [today, setToday] = useState(0);
    const [total, setTotal] = useState(0);

    // 컴포넌트가 처음 렌더링될 때 백엔드에서 데이터를 받아오는 로직
    useEffect(() => {
        // 데이터 요청 (백엔드에서 방문자 수 받아오기)
        axios.get('/api/visitor-count') // 여기에 실제 API URL을 넣어주세요
            .then(response => {
                // 응답에서 오늘 방문자 수와 총 방문자 수 추출하여 상태 업데이트
                setToday(response.data.today);
                setTotal(response.data.total);
            })
            .catch(error => {
                console.error('Error fetching visitor data:', error);
            });
    }, []); // 빈 배열을 넣으면 컴포넌트가 마운트될 때 한 번만 호출



    return (
        <SC.Background>

            <SC.TopBox>
                <TopBar />
            </SC.TopBox>


            <SC.Container>
                <SC.Header>
                    <SC.Back>
                        <img src={backIcon} alt="back" />
                    </SC.Back>
                    <SC.Title>옷장 공유</SC.Title>
                </SC.Header>

                <SC.ContentBox>
                    <div>{nickname}의 옷장</div>
                    <SC.DashandBox>
                        <SC.GrayBox>
                            <SC.TopBox2>
                                <SC.TodayTotal>TODAY {today} TOTAL {total}</SC.TodayTotal>
                                <SC.Friends>
                                    <img src={friends} alt="find friends" />
                                </SC.Friends>
                            </SC.TopBox2>
                            <SC.WhiteBox>
                                <SC.ProfImg>
                                    사용자에게 사진을 입력 받는 칸
                                </SC.ProfImg>
                                <SC.ProfTxt>
                                    <SC.Name>{nickname} 이름</SC.Name>
                                    <SC.Intro>사용자가 자기 소개 하는 칸 (최대 50자)</SC.Intro>
                                    <SC.Tag>
                                        <SC.TagItem>스트릿</SC.TagItem>
                                        <SC.TagItem>캐주얼</SC.TagItem>
                                        <SC.TagItem>러블리</SC.TagItem>
                                    </SC.Tag>
                                </SC.ProfTxt>
                            </SC.WhiteBox>
                            <SC.WhiteBox>
                                dfsfd
                            </SC.WhiteBox>
                        </SC.GrayBox>


                    </SC.DashandBox>
                </SC.ContentBox>

            </SC.Container>



            <SC.BottomBox>
                <Footer />
            </SC.BottomBox>
        </SC.Background >
    );
}

export default ShareCloset;
