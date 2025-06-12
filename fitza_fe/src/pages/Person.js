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

        axios.get(`${process.env.REACT_APP_API}/mypage`, {
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


    const [profile, setProfile] = useState({
        nickname: '',
        comment: '',
        style: '',
        imagePath: ''
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            console.error("JWT 토큰이 없습니다.");
            return;
        }

        // 기존 유저 정보
        axios.get(`${process.env.REACT_APP_API}/mypage`, {
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

        // 프로필 정보 추가
        axios.get(`${process.env.REACT_APP_API}/api/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const data = response.data.data;
                setProfile(data);
            })
            .catch(error => {
                console.error("프로필 정보 불러오기 실패", error);
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div>이름</div>
                            <div style={{ paddingRight: '50px' }}>{name}</div>
                        </div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div>닉네임</div>
                            <div style={{ paddingRight: '50px' }}>{nickname}</div>
                        </div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div>아이디</div>
                            <div style={{ paddingRight: '50px' }}>{username}</div>
                        </div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div>비밀번호</div>
                            <div style={{ paddingRight: '50px' }}>******</div>
                        </div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div>전화번호</div>
                            <div style={{ paddingRight: '50px' }}>{phone}</div>
                        </div>
                    </Per.FriendItem>
                </Per.FriendList>

                <Per.TitleBox1>
                    <Per.Title1>내 옷장 정보</Per.Title1>
                </Per.TitleBox1>
                <Per.FriendList>
                    <Per.FriendItem>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div>닉네임</div>
                            <div style={{ paddingRight: '50px' }}>{profile.nickname}</div>
                        </div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div>코멘트</div>
                            <div style={{ paddingRight: '50px' }}>{profile.comment}</div>
                        </div>
                    </Per.FriendItem>
                    <Per.FriendItem>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div>스타일</div>
                            <div style={{ paddingRight: '50px' }}>{profile.style}</div>
                        </div>
                    </Per.FriendItem>
                </Per.FriendList>

            </Per.Container>

            <Per.BottomBox>
                <Footer />
            </Per.BottomBox>
        </Per.Background >
    );
}

export default Person;
