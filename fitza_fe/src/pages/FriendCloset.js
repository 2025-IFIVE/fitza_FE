import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as SC from "../styles/ShareClosetStyle";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import axios from "axios";

// 이미지 주소
import backIcon from "../img/backButton.png";
import friends from "../img/shareClosetPage_friends.png";
import down from "../img/shareClosetPage_download.png";
import edit from "../img/shareClosetPage_edit.png";

function ShareCloset() {
    /* 상태 관리 */
    const [nickname, setNickname] = useState(""); // 닉네임
    const [bodyType, setBodyType] = useState(""); // 체형


    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 편집 모달
    const [profileImage, setProfileImage] = useState(null); // 프로필 이미지
    const [intro, setIntro] = useState(""); // 자기소개
    const [tag, setTag] = useState('');  // 태그 입력 필드 값
    const [tags, setTags] = useState([]); // 태그 배열 상태


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

    /* 이미지 다운로드 함수 */
    const handleDownload = () => {
        if (profileImage) {
            const link = document.createElement("a");
            link.href = profileImage; // 프로필 이미지 URL
            link.download = "profile-image.jpg"; // 저장될 파일명
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("다운로드할 프로필 이미지가 없습니다.");
        }
    };


    /* 모달 열기/닫기 */
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    /* 프사 바꾸기 */
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    // 태그 입력 후 엔터 누를 때
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && tag.trim() !== '') {
            setTags((prevTags) => [...prevTags, tag.trim()]);
            setTag(''); // 입력 필드 비우기
        }
    };

    // 태그 삭제
    const handleTagDelete = (tagToDelete) => {
        setTags(tags.filter((item) => item !== tagToDelete));
    };

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
                    <SC.Title>친구 옷장</SC.Title>
                </SC.Header>

                <SC.ContentBox>
                    <div style={{ fontFamily: "NanumSquareNeo", fontSize: "15px", fontWeight: "bold", color: 'white' }} >{nickname}의 옷장</div>
                    <SC.DashandBox>
                        <SC.GrayBox>
                            <SC.TopBox2>
                                <SC.TodayTotal>TODAY {today} TOTAL {total}</SC.TodayTotal>
                                <SC.Friends>
                                </SC.Friends>
                            </SC.TopBox2>
                            <SC.WhiteBox>
                                <SC.ProfImg>
                                    {profileImage ? (
                                        <img src={profileImage} alt="profile" />
                                    ) : (
                                        <div className="no-image-text">프로필 사진이 <br></br> 없습니다</div>
                                    )}
                                </SC.ProfImg>
                                <SC.ProfTxt>
                                    <SC.NameBox>
                                        <SC.Name>{nickname} </SC.Name>
                                        <SC.Down onClick={handleDownload}> <img src={down} alt="download" /></SC.Down>

                                    </SC.NameBox>
                                    <SC.Intro>{intro || "자기소개가 없습니다."}</SC.Intro>
                                    <SC.Tag>
                                        {tags.map((tag, index) => (
                                            <SC.TagItem key={index}>
                                                {tag}
                                                <span onClick={() => handleTagDelete(tag)} style={{ cursor: 'pointer', marginLeft: '5px' }}>X</span>
                                            </SC.TagItem>
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
            {isEditModalOpen && (
                <SC.ModalOverlay>
                    <SC.ModalContent>
                        <h3>프로필 편집</h3>
                        <SC.ProfileImageBox>
                            {/* 프로필 사진 수정 */}
                            <SC.ProfileImagePreview>
                                {profileImage ? (
                                    <img src={profileImage} alt="프로필 이미지" className="profile-image-preview" />
                                ) : (
                                    <div>현재 프로필 사진이 없습니다</div>
                                )}
                            </SC.ProfileImagePreview>
                            {/* 커스터마이즈된 파일 선택 버튼 */}
                            <label
                                htmlFor="file-upload"
                                style={{
                                    cursor: 'pointer',
                                    color: 'black',
                                    fontSize: '10px', // 글씨 크기
                                    textAlign: 'center', // 텍스트 중앙 정렬
                                    backgroundColor: 'white',
                                }}

                            >
                                갤러리에서 프로필 사진 등록하기 ▶
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                accept="image/*"
                                onChange={handleImageUpload} // 이미지 업로드 핸들러
                                style={{ display: 'none' }} // 기본 input을 숨깁니다
                            />
                        </SC.ProfileImageBox>

                        {/* 닉네임 입력 */}
                        <SC.InputBox>
                            <span>닉네임</span>
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder={nickname}
                            />
                        </SC.InputBox>

                        {/* 자기소개 입력 */}
                        <SC.TextareaBox>
                            <span>코멘트</span>
                            <textarea
                                value={intro}
                                onChange={(e) => setIntro(e.target.value)}
                                placeholder={intro}
                                maxLength={50}
                            />
                        </SC.TextareaBox>

                        <SC.InputTagBox>
                            <span>태그</span>
                            <textarea
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                placeholder="태그를 입력하고 엔터를 누르세요"
                                onKeyPress={handleKeyPress} // 엔터 키 이벤트 처리
                            />
                        </SC.InputTagBox>
                        <SC.TagList>
                            {tags.map((item, index) => (
                                <SC.Tag key={index}>
                                    {item}
                                    <span onClick={() => handleTagDelete(item)}>X</span>
                                </SC.Tag>
                            ))}
                        </SC.TagList>

                        {/* 버튼들 */}
                        <SC.ButtonBox>
                            <SC.SaveButton onClick={closeEditModal}>저장</SC.SaveButton>
                            <SC.CancelButton onClick={closeEditModal}>취소</SC.CancelButton>
                        </SC.ButtonBox>
                    </SC.ModalContent>
                </SC.ModalOverlay>
            )


            }
            {/* ===================================================================================================== */}
            {/* ===================================================================================================== */}

            {/* 2.  */}

            {/* ===================================================================================================== */}
            {/* ===================================================================================================== */}


        </SC.Background >
    );
}

export default ShareCloset;
