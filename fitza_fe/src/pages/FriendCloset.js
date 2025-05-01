import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as SC from "../styles/ShareClosetStyle";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import backIcon from "../img/backButton.png";
import friends from "../img/shareClosetPage_friends.png";



{/*
   나중에 app.js나 router.js에 이거 추가해야 함!!
   <Route path="/friendCloset/:id" element={<FriendCloset />} />
 
    */}
function FriendCloset() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nickname, setNickname] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [intro, setIntro] = useState("");
    const [tags, setTags] = useState([]);

    const [showTodayOutfit, setShowTodayOutfit] = useState(false);
    const [showOutfitList, setShowOutfitList] = useState(false);

    const toggleTodayOutfit = () => {
        setShowTodayOutfit(prev => !prev);
        setShowOutfitList(false);
    };

    const toggleOutfitList = () => {
        setShowOutfitList(prev => !prev);
        setShowTodayOutfit(false);
    };

    useEffect(() => {
        fetch(`/api/friend-profile/${id}`)
            .then(res => res.json())
            .then(data => {
                setNickname(data.nickname);
                setProfileImage(data.profileImage || null);
                setIntro(data.intro || "");
                setTags(data.tags || []);
            })
            .catch(err => console.error("친구 정보 불러오기 실패:", err));
    }, [id]);

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
                    <div>{nickname}의 옷장</div>
                    <SC.DashandBox>
                        <SC.GrayBox>
                            <SC.TopBox2>
                                {/* 방문자 수는 친구 페이지에서는 안 보여줌 */}
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
                                        <img src={profileImage} alt="profile" />
                                    ) : (
                                        <div className="no-image-text">프로필 사진이 없습니다</div>
                                    )}
                                </SC.ProfImg>
                                <SC.ProfTxt>
                                    <SC.NameBox>
                                        <SC.Name>{nickname}</SC.Name>
                                        {/* 친구 페이지라 수정 및 다운로드 버튼 없음 */}
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
                                            <SC.OutfitBox3>
                                                <div>오늘의 날짜</div>
                                                <div>여기에 오늘의 코디 사진</div>
                                            </SC.OutfitBox3>
                                        </SC.RecentOutfit>
                                    )}

                                    {showOutfitList && (
                                        <SC.OutfitList>
                                            <SC.OutfitBox2>
                                                <div>1월 3일</div>
                                                <div>여기에 코디 사진</div>
                                            </SC.OutfitBox2>
                                            <SC.OutfitBox2>
                                                <div>1월 4일</div>
                                                <div>여기에 코디 사진</div>
                                            </SC.OutfitBox2>
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
