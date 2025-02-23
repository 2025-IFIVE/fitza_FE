import React from "react";
import * as MP from "../styles/MypageStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'

function Mypage() {
    return (
        <MP.Background>
            <MP.TopBox>
                <TopBar />
            </MP.TopBox>
            <MP.BottomBox>
                <Footer />
            </MP.BottomBox>
        </MP.Background>
    );
}

export default Mypage;
