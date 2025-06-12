// FriendCloset.js - 공유 옷장도 ShareCloset처럼 제목 + 박스 + 위치 기반 배치로 수정
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as SC from "../styles/ShareClosetStyle";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import backIcon from "../img/backButton.png";
import friends from "../img/shareClosetPage_friends.png";
import axios from "axios";

function FriendCloset() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [intro, setIntro] = useState("");
    const [tags, setTags] = useState([]);
    const [sharedCoordis, setSharedCoordis] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token || !id) return;

        axios.get(`${process.env.REACT_APP_API}/api/profile/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                const data = res.data?.data;
                if (data) {
                    setNickname(data.nickname || "이름없음");
                    setProfileImage(data.imagePath || null);
                    setIntro(data.comment || "");
                    setTags(data.style?.split(",").map(tag => tag.trim()) || []);
                }
            })
            .catch(err => console.error("친구 프로필 조회 실패:", err));
    }, [id]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token || !id) return;

        axios.get(`${process.env.REACT_APP_API}/api/share/friends/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setSharedCoordis(res.data || []);
            })
            .catch(err => console.error("공유 코디 조회 실패:", err));
    }, [id]);

    return (
        <SC.Background>
            <SC.TopBox><TopBar /></SC.TopBox>

            <SC.Container>
                <SC.Header>
                    <SC.Back onClick={() => navigate(-1)}>
                        <img src={backIcon} alt="back" />
                    </SC.Back>
                    <SC.Title>옷장 공유</SC.Title>
                </SC.Header>

                <SC.ContentBox>
                    <div style={{ fontFamily: "NanumSquareNeo", fontSize: "15px", fontWeight: "bold", color: "white" }}>
                        {nickname}의 옷장
                    </div>

                    <SC.DashandBox>
                        <SC.GrayBox>
                            <SC.TopBox2>
                                <div />
                                <SC.Friends>
                                    <SC.FriendLink to="/friends">
                                        <img src={friends} alt="friends" />
                                    </SC.FriendLink>
                                </SC.Friends>
                            </SC.TopBox2>

                            <SC.WhiteBox>
                                <SC.ProfImg>
                                    {profileImage ? (
                                        <img src={`${process.env.REACT_APP_API}/${profileImage.replace(/^\/+/, '')}`} alt="profile" />
                                    ) : (
                                        <div className="no-image-text">프로필 사진이 없습니다</div>
                                    )}
                                </SC.ProfImg>
                                <SC.ProfTxt>
                                    <SC.NameBox>
                                        <SC.Name>{nickname}</SC.Name>
                                    </SC.NameBox>
                                    <SC.Intro>{intro}</SC.Intro>
                                    <SC.Tag>
                                        {tags.map((tag, idx) => (
                                            <SC.TagItem key={idx}>{tag}</SC.TagItem>
                                        ))}
                                    </SC.Tag>
                                </SC.ProfTxt>
                            </SC.WhiteBox>

                            <SC.WhiteBox2>
                                <SC.ContentBox2>
                                    <SC.OutfitList>
                                        {sharedCoordis.length === 0 ? (
                                            <SC.OutfitBox2>
                                                <div>공유된 코디가 없습니다</div>
                                            </SC.OutfitBox2>
                                        ) : (
                                            sharedCoordis.map((coordi, index) => (
                                                <SC.OutfitBox2 key={index}>
                                                    <div >{coordi.title}</div>
                                                    <SC.RandomBoard style={{ position: 'relative', height: '300px' }}>
                                                        {coordi.items.map((item, idx) => {
                                                            const { x = 0, y = 0, size = 30 } = item;
                                                            return (
                                                                <SC.RandomItem
                                                                    key={idx}
                                                                    style={{
                                                                        position: "absolute",
                                                                        left: `${x}%`,
                                                                        top: `${y}%`,
                                                                        width: `${size}%`,
                                                                        zIndex: 10 + idx,
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={`${process.env.REACT_APP_API}/${item.croppedPath || item.imagePath}`}
                                                                        alt={`item-${idx}`}
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            objectFit: "contain",
                                                                            pointerEvents: "none",
                                                                        }}
                                                                        draggable={false}
                                                                    />
                                                                </SC.RandomItem>
                                                            );
                                                        })}
                                                    </SC.RandomBoard>
                                                </SC.OutfitBox2>
                                            ))
                                        )}
                                    </SC.OutfitList>
                                </SC.ContentBox2>
                            </SC.WhiteBox2>
                        </SC.GrayBox>
                    </SC.DashandBox>
                </SC.ContentBox>
            </SC.Container>

            <SC.BottomBox><Footer /></SC.BottomBox>
        </SC.Background>
    );
}

export default FriendCloset;
