import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as SC from "../styles/ShareClosetStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { useEffect, useState } from "react";

// 이미지 주소 넣는 곳
//메뉴 아이콘
import backIcon from '../img/backButton.png';


function ShareCloset() {
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


    return (
        <SC.Background>

            <SC.TopBox>
                <TopBar />
            </SC.TopBox>



            <SC.Header>
                <SC.Back>
                    <img src={backIcon} alt="round typess" />
                </SC.Back>
                <SC.Title>옷장 공유</SC.Title>
            </SC.Header>




            <SC.BottomBox>
                <Footer />
            </SC.BottomBox>
        </SC.Background >
    );
}

export default ShareCloset;
