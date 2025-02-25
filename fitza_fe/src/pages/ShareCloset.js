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
    const [profileImage, setProfileImage] = useState(null); // 프로필 이미지
    const [intro, setIntro] = useState(""); // 자기소개
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 편집 모달
    const [today, setToday] = useState(0); // 오늘 방문자 수
    const [total, setTotal] = useState(0); // 총 방문자 수

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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };


    /* 모달 열기/닫기 */
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    return (
        <SC.Background>
            <SC.TopBox>
                <TopBar />
            </SC.TopBox>

            <SC.Container>
                <SC.Header>
                    <SC.Back>
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
                                    <img src={friends} alt="find friends" />
                                </SC.Friends>
                            </SC.TopBox2>
                            <SC.WhiteBox>
                                <SC.ProfImg>
                                    {profileImage ? (
                                        <img src={profileImage} alt="profile" />
                                    ) : (
                                        <div className="no-image-text">프로필 사진을 <br></br> 등록해주세요</div>
                                    )}
                                </SC.ProfImg>
                                <SC.ProfTxt>
                                    <SC.NameBox>
                                        <SC.Name>{nickname} </SC.Name>
                                        <SC.Down onClick={handleDownload}> <img src={down} alt="download" /></SC.Down>
                                        <SC.Edit onClick={openEditModal}> <img src={edit} alt="edit" /> </SC.Edit>
                                    </SC.NameBox>
                                    <SC.Intro>{intro || "자기소개가 없습니다."}</SC.Intro>
                                    <SC.Tag>
                                        <SC.TagItem>스트릿</SC.TagItem>
                                        <SC.TagItem>캐주얼</SC.TagItem>
                                        <SC.TagItem>러블리</SC.TagItem>
                                    </SC.Tag>
                                </SC.ProfTxt>
                            </SC.WhiteBox>
                        </SC.GrayBox>
                    </SC.DashandBox>
                </SC.ContentBox>
            </SC.Container>

            <SC.BottomBox>
                <Footer />
            </SC.BottomBox>


            {/* 편집 모달 */}
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

                        {/* 버튼들 */}
                        <SC.ButtonBox>
                            <SC.SaveButton onClick={closeEditModal}>저장</SC.SaveButton>
                            <SC.CancelButton onClick={closeEditModal}>취소</SC.CancelButton>
                        </SC.ButtonBox>
                    </SC.ModalContent>
                </SC.ModalOverlay>
            )
            }

        </SC.Background >
    );
}

export default ShareCloset;
