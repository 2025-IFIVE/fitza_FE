import React, { useState } from "react";
import * as C from "../styles/FriendsStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';

function Friends() {
    return (
        <C.Background>
            <C.TopBox>
                <TopBar />
            </C.TopBox>

            <C.Container>
                <C.Header>
                    <C.Title>친구 목록</C.Title>
                </C.Header>
                <C.TitleBox1>
                    <C.Title1>내 옷장 ᐳ 친구 목록</C.Title1>
                    <C.RegisterContainer>
                        <C.Register>친구 추가하기</C.Register>
                        <img src={smallPlus} alt="plus" />
                    </C.RegisterContainer>
                </C.TitleBox1>
            </C.Container>

            <C.BottomBox>
                <Footer />
            </C.BottomBox>
        </C.Background>
    );
}

export default Friends;
