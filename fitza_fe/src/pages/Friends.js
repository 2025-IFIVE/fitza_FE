import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as SC from "../styles/ShareClosetStyle";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import axios from "axios";

// 이미지 주소
import backIcon from "../img/backButton.png";
import friends from "../img/shareClosetPage_friends.png";


function ShareCloset() {
    /* 상태 관리 */
    const [nickname, setNickname] = useState(""); // 닉네임
    const [bodyType, setBodyType] = useState(""); // 체형


    const [profileImage, setProfileImage] = useState(null); // 프로필 이미지
    const [intro, setIntro] = useState(""); // 자기소개


    const [today, setToday] = useState(0); // 오늘 방문자 수
    const [total, setTotal] = useState(0); // 총 방문자 수

    const [showTodayOutfit, setShowTodayOutfit] = useState(false);
    const [showOutfitList, setShowOutfitList] = useState(false);

    const navigate = useNavigate();  // useNavigate 훅 사용

    const handleBackClick = () => {
        navigate(-1);  // 이전 페이지로 이동
    };



    /* 사용자 프로필 정보 가져오기 */
    useEffect(() => {
        fetch("/api/user-profile")
            .then(response => response.json())
            .then(data => {
                setNickname(data.nickname);
                setBodyType(data.bodyType);
                setIntro(data.intro || "");
                setProfileImage(data.profileImage || null);
            })
            .catch(error => console.error("Error fetching user data:", error));
    }, []);

    /* 방문자 수 가져오기 */
    useEffect(() => {
        axios.get("/api/visitor-count")
            .then(response => {
                setToday(response.data.today);
                setTotal(response.data.total);
            })
            .catch(error => {
                console.error("Error fetching visitor data:", error);
            });
    }, []);


    // 버튼 클릭 시 토글 상태 변경
    const toggleTodayOutfit = () => {
        setShowTodayOutfit(prevState => !prevState);
        setShowOutfitList(false); // 다른 콘텐츠가 열릴 때는 자동으로 닫히게 설정
    };

    const toggleOutfitList = () => {
        setShowOutfitList(prevState => !prevState);
        setShowTodayOutfit(false); // 다른 콘텐츠가 열릴 때는 자동으로 닫히게 설정
    };


    return (
        <SC.Background>
            <SC.TopBox>
                <TopBar />
            </SC.TopBox>

            <SC.Container>
                <SC.Header>
                    <SC.Back onClick={handleBackClick}>
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
                                    <SC.FriendLink to="/friends">
                                        <img src={friends} alt="find friends" />
                                    </SC.FriendLink>
                                </SC.Friends>
                            </SC.TopBox2>

                            <SC.WhiteBox2>
                                <SC.ToggleBox>
                                    <SC.ToggleButton onClick={toggleTodayOutfit} isActive={showTodayOutfit}>
                                        오늘의 코디
                                    </SC.ToggleButton>
                                    <SC.ToggleButton onClick={toggleOutfitList} isActive={showOutfitList}>
                                        코디 목록
                                    </SC.ToggleButton>
                                </SC.ToggleBox>

                                <SC.ContentBox2>
                                    {showTodayOutfit && (
                                        <SC.RecentOutfit>
                                            {/* 오늘의 코디 내용을 여기에 추가 */}
                                            코디 등록 버튼
                                        </SC.RecentOutfit>
                                    )}

                                    {showOutfitList && (
                                        <SC.OutfitList>
                                            {/* 코디 목록 내용을 여기에 추가 */}
                                            코디 목록
                                        </SC.OutfitList>
                                    )}
                                </SC.ContentBox2>
                            </SC.WhiteBox2>
                        </SC.GrayBox>
                    </SC.DashandBox>
                </SC.ContentBox>
            </SC.Container>

            <SC.BottomBox>
                <Footer />
            </SC.BottomBox>

            {/* ===================================================================================================== */}
            {/* ===================================================================================================== */}

            {/* 1. 편집 모달 */}

            {/* ===================================================================================================== */}
            {/* ===================================================================================================== */}

            {/* ===================================================================================================== */}
            {/* ===================================================================================================== */}

            {/* 2.  */}

            {/* ===================================================================================================== */}
            {/* ===================================================================================================== */}


        </SC.Background >
    );
}

export default ShareCloset;
