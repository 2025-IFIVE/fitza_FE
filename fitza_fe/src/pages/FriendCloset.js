import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as SC from "../styles/ShareClosetStyle";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import backIcon from "../img/backButton.png";
import friends from "../img/shareClosetPage_friends.png";
import axios from "axios";

function FriendCloset() {
    const { id } = useParams(); // 친구 ID
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const [nickname, setNickname] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [intro, setIntro] = useState("친구 소개글은 비공개입니다.");
    const [tags, setTags] = useState([]);
    const [sharedCoordis, setSharedCoordis] = useState([]);

    // ✅ 친구 프로필 정보 불러오기
    // ✅ 친구 프로필 정보 불러오기
    useEffect(() => {
        if (!token || !id) return;

        axios.get(`http://localhost:8080/api/profile/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                const data = res.data?.data;
                if (data) {
                    setNickname(data.nickname || "");
                    setProfileImage(data.imagePath || null);
                    setIntro(data.comment || "친구 소개글은 비공개입니다.");
                    const styleTags = data.style ? data.style.split(",") : [];
                    setTags(styleTags);
                }
            })
            .catch(err => {
                console.error("❌ 친구 프로필 조회 실패:", err.response?.data || err.message);

                // ✅ fallback 기본값
                setNickname("알 수 없음");
                setProfileImage(null);
                setIntro("친구의 프로필 정보를 불러올 수 없습니다.");
                setTags([]);
            });
    }, [id, token]);



    // 공유 코디 불러오기
    useEffect(() => {
        if (!token || !id) return;

        console.log(`📦 요청 보냄: /api/share/friends/${id}`);

        setSharedCoordis([]); // 초기화

        axios.get(`http://localhost:8080/api/share/friends/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                const coordis = Array.isArray(res.data) ? res.data : [];

                console.log("응답 받은 코디 수:", coordis.length);
                console.log("응답 내용 확인:", coordis);

                const owners = [...new Set(coordis.map(c => c.ownerNickname))];
                console.log("포함된 ownerNickname 목록:", owners);

                setSharedCoordis(coordis);
            })
            .catch(err => {
                console.error("공유 코디 불러오기 실패:", err.response?.data || err.message);
            });
    }, [id, token]);



    return (
        <SC.Background>
            <SC.TopBox>
                <TopBar />
            </SC.TopBox>

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
                                    {profileImage
                                        ? <img src={`http://localhost:8080${profileImage}`} alt="profile" />
                                        : <div className="no-image-text">프로필 사진이 없습니다</div>}
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
                                            sharedCoordis.map((coordi) => (
                                                <SC.OutfitBox2 key={coordi.shareId}>
                                                    <div>{coordi.title || coordi.date}</div>
                                                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                                                        {coordi.items.slice(0, 3).map((item, idx) => (
                                                            <img
                                                                key={idx}
                                                                src={`http://localhost:8080${item.croppedPath || item.imagePath}`}
                                                                alt={`shared-${idx}`}
                                                                style={{ height: "50px" }}
                                                            />
                                                        ))}
                                                    </div>
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

            <SC.BottomBox>
                <Footer />
            </SC.BottomBox>
        </SC.Background>
    );
}

export default FriendCloset;
