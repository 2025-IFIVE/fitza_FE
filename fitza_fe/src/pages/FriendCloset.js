import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as SC from "../styles/ShareClosetStyle";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import backIcon from "../img/backButton.png";
import friends from "../img/shareClosetPage_friends.png";
import axios from "axios";

function FriendCloset() {
    const { id } = useParams();  // 친구 ID
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const [nickname, setNickname] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [intro, setIntro] = useState("");
    const [tags, setTags] = useState([]);
    const [todayCoordi, setTodayCoordi] = useState(null);
    const [todayCoordiImages, setTodayCoordiImages] = useState([]);
    const [sharedCoordis, setSharedCoordis] = useState([]);
    const [showTodayOutfit, setShowTodayOutfit] = useState(false);
    const [showOutfitList, setShowOutfitList] = useState(false);

    // 친구 프로필 정보
    // 친구 프로필 정보
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        axios.get("http://localhost:8080/api/friends/list", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                const friendList = res.data?.data || [];
                const friend = friendList.find(f => String(f.id) === String(id));

                if (friend) {
                    setNickname(friend.nickname);
                    // 프로필 이미지와 소개글은 없으므로 디폴트로 설정
                    setIntro("친구 소개글은 비공개입니다.");
                    setTags([]);  // 친구 스타일 정보 없음
                    setProfileImage(null);  // 친구 프사 없음
                } else {
                    console.error("해당 친구를 찾을 수 없습니다.");
                }
            })
            .catch(err => {
                console.error("친구 목록 조회 실패:", err);
            });
    }, [id]);




    // 오늘의 코디
    useEffect(() => {
        axios.get(`http://localhost:8080/api/friend-coordination/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setTodayCoordi(res.data);  // 전체 객체 저장
                const paths = res.data.items.map(item => item.imagePath);
                setTodayCoordiImages(paths);
            })
            .catch(err => console.error("오늘의 코디 불러오기 실패:", err));
    }, [id]);

    // 공유 코디 목록
    useEffect(() => {
        axios.get(`http://localhost:8080/api/share/friends?friendId=${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setSharedCoordis(res.data);
            })
            .catch(err => console.error("공유 코디 불러오기 실패:", err));
    }, [id]);


    const toggleTodayOutfit = () => {
        setShowTodayOutfit(prev => !prev);
        setShowOutfitList(false);
    };

    const toggleOutfitList = () => {
        setShowOutfitList(prev => !prev);
        setShowTodayOutfit(false);
    };

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
                                    <SC.Intro>{intro || "자기소개가 없습니다."}</SC.Intro>
                                    <SC.Tag>
                                        {tags.map((tag, idx) => (
                                            <SC.TagItem key={idx}>{tag}</SC.TagItem>
                                        ))}
                                    </SC.Tag>
                                </SC.ProfTxt>
                            </SC.WhiteBox>

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
                                            {todayCoordi ? (
                                                <SC.OutfitBox3>
                                                    <div>{todayCoordi.title}</div>
                                                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                                                        {todayCoordiImages.map((src, idx) => (
                                                            <img key={idx} src={`http://localhost:8080${src}`} alt={`coordi-${idx}`} style={{ height: "60px" }} />
                                                        ))}
                                                    </div>
                                                </SC.OutfitBox3>
                                            ) : (
                                                <SC.OutfitBox3>
                                                    <div>오늘의 코디가 없습니다</div>
                                                </SC.OutfitBox3>
                                            )}
                                        </SC.RecentOutfit>
                                    )}

                                    {showOutfitList && (
                                        <SC.OutfitList>
                                            {sharedCoordis.length === 0 ? (
                                                <SC.OutfitBox2>
                                                    <div>공유된 코디가 없습니다</div>
                                                </SC.OutfitBox2>
                                            ) : (
                                                sharedCoordis.map((coordi, index) => (
                                                    <SC.OutfitBox2 key={index}>
                                                        <div>{coordi.title || coordi.date}</div>
                                                        <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                                                            {coordi.items.slice(0, 3).map((item, idx) => (
                                                                <img key={idx} src={`http://localhost:8080${item.croppedPath || item.imagePath}`} alt={`shared-${idx}`} style={{ height: "50px" }} />
                                                            ))}
                                                        </div>
                                                    </SC.OutfitBox2>
                                                ))
                                            )}
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
        </SC.Background>
    );
}

export default FriendCloset;
