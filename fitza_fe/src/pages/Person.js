import React, { useState, useEffect } from "react";
import * as Per from "../styles/PersonStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import backIcon from "../img/backButton.png";

function Person() {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);  // 이전 페이지로 이동
    };

    const [name, setname] = useState('');
    const [username, setusername] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setphone] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            console.error("JWT 토큰이 없습니다.");
            return;
        }

        axios.get("http://localhost:8080/mypage", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                const user = response.data.data;
                setname(user.name);
                setusername(user.username);
                setNickname(user.nickname);
                setphone(user.phone);
            })
            .catch(error => {
                console.error("유저 정보 불러오기 실패", error);
            });
    }, []);

    return (
        <Per.Background>
            <Per.TopBox>
                <TopBar />
            </Per.TopBox>

            <Per.Container>
                <Per.Header>
                    <Per.Back onClick={handleBackClick}>
                        <img src={backIcon} alt="back" />
                    </Per.Back>
                    <Per.Title>개인 정보</Per.Title>
                </Per.Header>

                <Per.TitleBox1>
                    <Per.Title1>개인 정보</Per.Title1>
                </Per.TitleBox1>
                <Per.FriendList>
                    <Per.FriendItem>
                        <div>이름: {name}</div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div>닉네임: {nickname}</div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div>아이디: {username}</div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div>비밀번호: ******</div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div>전화번호: {phone}</div>
                    </Per.FriendItem>
                </Per.FriendList>

                <Per.TitleBox1>
                    <Per.Title1>내 옷장 정보</Per.Title1>
                </Per.TitleBox1>
                <Per.FriendList>
                    <Per.FriendItem>
                        <div>프로필 사진</div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div>닉네임</div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div>코멘트</div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div>스타일</div>
                    </Per.FriendItem>
                </Per.FriendList>
            </Per.Container>

            <Per.BottomBox>
                <Footer />
            </Per.BottomBox>
        </Per.Background>
    );
}

export default Person;
